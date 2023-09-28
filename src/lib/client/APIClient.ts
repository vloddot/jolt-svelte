import { goto } from '$app/navigation';
import { base } from '$app/paths';

export class APIClient {
	cache: {
		channels: Map<string, Channel>;
		emojis: Map<string, Emoji>;
		members: Map<{ user: string; server: string }, Member>;
		servers: Map<string, Server>;
		users: Map<string, User>;
	} = {
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

		if (!response.ok) {
			throw response.statusText;
		}

		return response;
	}

	async login(data: DataLogin): Promise<ResponseLogin> {
		const response = await this.req('POST', '/auth/session/login', JSON.stringify(data));
		return await response.json();
	}

	async logout(): Promise<void> {
		await this.req('POST', '/auth/session/logout');
	}

	async deleteSession(id: string): Promise<void> {
		await this.req('DELETE', `/auth/session/${id}`);
	}

	async createServer(body: DataCreateServer): Promise<CreateServerResponse> {
		const response = await this.req('POST', '/servers/create', JSON.stringify(body));
		return await response.json();
	}

	async changeUsername(username: string, password: string): Promise<User> {
		const response = await this.req(
			'PATCH',
			'/users/@me/username',
			JSON.stringify({ username, password })
		);
		return await response.json();
	}

	async joinCall(channel_id: string): Promise<string> {
		return this.req('POST', `/channels/${channel_id}/join_call`)
			.then((response) => response.json())
			.then(({ token }) => token)
	}

	async editServer(id: string, data: DataEditServer) {
		return await this.req('PATCH', `/servers/${id}`, JSON.stringify(data));
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
		const response = await this.req('GET', '/users/dms');
		return await response.json();
	}

	async ackMessage(channel_id: string, message_id: string): Promise<void> {
		await this.req('PUT', `/channels/${channel_id}/ack/${message_id}`);
	}

	async fetchSettings<K extends string>(
		keys: K[]
	): Promise<Record<K, [number, string] | undefined>> {
		const response = await this.req('POST', '/sync/settings/fetch', JSON.stringify({ keys }));
		return await response.json();
	}

	async fetchMembers(server_id: string): Promise<AllMemberResponse> {
		const response = await this.req('GET', `/servers/${server_id}/members`);
		return await response.json();
	}

	async fetchMessage(channel_id: string, message_id: string): Promise<Message> {
		const response = await this.req('GET', `/channels/${channel_id}/messages/${message_id}`);
		return await response.json();
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
		const response = await this.req('GET', `/channels/${channel_id}/messages${params}`);
		return await response.json();
	}

	async sendMessage(channel_id: string, data_message_send: DataMessageSend): Promise<Message> {
		const response = await this.req(
			'POST',
			`/channels/${channel_id}/messages`,
			JSON.stringify(data_message_send)
		);

		return await response.json();
	}

	async editMessage(
		channel_id: string,
		message_id: string,
		data_edit_message: DataEditMessage
	): Promise<Message> {
		const response = await this.req(
			'PATCH',
			`/channels/${channel_id}/messages/${message_id}`,
			JSON.stringify(data_edit_message)
		);

		return await response.json();
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
		const response = await this.req('GET', '/auth/session/all');
		return response.json();
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
		const response = await this.req('GET', `/users/${id}/profile`);
		return response.json();
	}
}
