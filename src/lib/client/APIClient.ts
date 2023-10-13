import { goto } from '$app/navigation';
import { base } from '$app/paths';

type Cache = {
	channels: Map<Channel['_id'], Channel>;
	emojis: Map<Emoji['_id'], Emoji>;
	members: Map<Member['_id'], Member>;
	servers: Map<Server['_id'], Server>;
	users: Map<User['_id'], User>;
};

export class APIClient {
	cache: Cache = {
		channels: new Map(),
		emojis: new Map(),
		members: new Map(),
		servers: new Map(),
		users: new Map()
	};

	token: string | undefined;

	constructor(token?: string) {
		if (token) {
			this.token = token;
		}
	}

	async req(
		method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
		path: string,
		body?: string
	): Promise<Response> {
		const response = await fetch(`https://api.revolt.chat${path}`, {
			method,
			body,
			headers: this.token == undefined ? this.token : { 'x-session-token': this.token }
		});

		if (response.status == 401) {
			localStorage.removeItem('session');
			await goto(`${base}/login`);
		}

		return response;
	}

	async login(data: DataLogin): Promise<ResponseLogin> {
		return this.req('POST', '/auth/session/login', JSON.stringify(data)).then((response) =>
			response.json()
		);
	}

	async logout(): Promise<void> {
		await this.req('POST', '/auth/session/logout');
	}

	async revokeSession(id: string): Promise<void> {
		await this.req('DELETE', `/auth/session/${id}`);
	}

	async revokeAllSessions(revoke_self: boolean): Promise<void> {
		await this.req('DELETE', `/auth/session/all?revoke_self=${revoke_self}`);
	}

	async createServer(body: DataCreateServer): Promise<CreateServerResponse> {
		return this.req('POST', '/servers/create', JSON.stringify(body)).then((response) =>
			response.json()
		);
	}

	async changeUsername(username: string, password: string): Promise<User> {
		return this.req('PATCH', '/users/@me/username', JSON.stringify({ username, password })).then(
			(response) => response.json()
		);
	}

	async openDM(id: string): Promise<Extract<Channel, { channel_type: 'DirectMessage' }>> {
		return this.req('GET', `/users/${id}/dm`).then((response) => response.json());
	}

	async joinCall(channel_id: string): Promise<string> {
		return this.req('POST', `/channels/${channel_id}/join_call`)
			.then((response) => response.json())
			.then(({ token }) => token);
	}

	async acceptFriend(id: string): Promise<User> {
		return this.req('PUT', `/channels/${id}/friend`).then((response) => response.json());
	}

	async removeFriend(id: string): Promise<User> {
		return this.req('DELETE', `/users/${id}/friend`).then((response) => response.json());
	}

	async editServer(id: string, data: DataEditServer): Promise<Server> {
		return this.req('PATCH', `/servers/${id}`, JSON.stringify(data)).then((response) =>
			response.json()
		);
	}

	async fetchChannel(id: string): Promise<Channel> {
		const channel = this.cache.channels.get(id);

		if (channel == undefined) {
			const result: Channel = await this.req('GET', `/channels/${id}`).then((response) =>
				response.json()
			);
			this.cache.channels.set(result._id, result);
			return result;
		}

		return channel;
	}

	async fetchDirectMessages(): Promise<
		Exclude<Channel, { channel_type: 'TextChannel' | 'VoiceChannel' }>[]
	> {
		return this.req('GET', '/users/dms').then((response) => response.json());
	}

	async ackMessage(channel_id: string, message_id: string): Promise<void> {
		await this.req('PUT', `/channels/${channel_id}/ack/${message_id}`);
	}

	async fetchSettings<K extends string>(
		keys: K[]
	): Promise<Record<K, [number, string] | undefined>> {
		return this.req('POST', '/sync/settings/fetch', JSON.stringify({ keys })).then((response) =>
			response.json()
		);
	}

	async setSettings(
		settings: Record<string, string | boolean | number | object>,
		timestamp = Date.now()
	): Promise<void> {
		for (const [key, value] of Object.entries(settings)) {
			settings[key] = typeof value == 'string' ? value : JSON.stringify(value);
		};

		await this.req('POST', `/sync/settings/set?timestamp=${timestamp}`, JSON.stringify(settings));
	}

	async fetchMembers(server_id: string): Promise<AllMemberResponse> {
		return await this.req('GET', `/servers/${server_id}/members`).then((response) =>
			response.json()
		);
	}

	async fetchMessage(channel_id: string, message_id: string): Promise<Message> {
		return this.req('GET', `/channels/${channel_id}/messages/${message_id}`).then((response) =>
			response.json()
		);
	}

	async queryMessages(
		channel_id: string,
		data_query_messages: Omit<OptionsMessageSearch, 'query'>
	): Promise<BulkMessageResponse> {
		const params =
			'?' +
			new URLSearchParams(
				Object.entries(data_query_messages).map(([key, value]) => [key, value.toString()])
			);
		return this.req('GET', `/channels/${channel_id}/messages${params}`).then((response) =>
			response.json()
		);
	}

	async sendMessage(channel_id: string, data_message_send: DataMessageSend): Promise<Message> {
		return this.req(
			'POST',
			`/channels/${channel_id}/messages`,
			JSON.stringify(data_message_send)
		).then((response) => response.json());
	}

	async editMessage(
		channel_id: string,
		message_id: string,
		data_edit_message: DataEditMessage
	): Promise<Message> {
		return this.req(
			'PATCH',
			`/channels/${channel_id}/messages/${message_id}`,
			JSON.stringify(data_edit_message)
		).then((response) => response.json());
	}

	async deleteMessage(channel_id: string, message_id: string): Promise<void> {
		await this.req('DELETE', `/channels/${channel_id}/messages/${message_id}`);
	}

	async fetchServer(id: string): Promise<Server> {
		const server = this.cache.servers.get(id);

		if (server == undefined) {
			const result: Server = await this.req('GET', `/servers/${id}`).then((response) =>
				response.json()
			);
			this.cache.servers.set(result._id, result);
			return result;
		}

		return server;
	}

	async fetchSessions(): Promise<SessionInfo[]> {
		return this.req('GET', '/auth/session/all').then((response) => response.json());
	}

	async fetchUser(id: string): Promise<User> {
		const user = this.cache.users.get(id);

		if (user == undefined) {
			const result: User = await this.req('GET', `/users/${id}`).then((response) =>
				response.json()
			);
			this.cache.users.set(result._id, result);
			return result;
		}

		return user;
	}

	async fetchUserProfile(id: string): Promise<UserProfile> {
		return this.req('GET', `/users/${id}/profile`).then((response) => response.json());
	}
}
