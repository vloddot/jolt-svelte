export class APIClient {
	cache:
		| {
				channels: Channel[];
				emojis: Emoji[];
				members: Member[];
				servers: Server[];
				users: User[];
		  }
		| undefined;
	token: string | undefined;

	constructor(token?: string) {
		if (token) {
			this.token = token;
		}
	}

	async req<T>(
		method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
		path: string,
		expectResponse: boolean,
		body?: string
	): Promise<T> {
		const response = await fetch(`https://api.revolt.chat${path}`, {
			method,
			body,
			headers: this.token == undefined ? this.token : { 'x-session-token': this.token }
		}).catch((error) => {
			throw new Error(error);
		});

		if (!response.ok) {
			throw new Error(await response.text());
		}

		if (response.body == null && expectResponse) {
			throw new Error(`expected response from route ${path}`);
		}

		return response.json();
	}

	login(data: DataLogin): Promise<ResponseLogin> {
		return this.req('POST', '/auth/session/login', true, JSON.stringify(data));
	}

	logout(): Promise<void> {
		return this.req('POST', '/auth/session/logout', false);
	}

	deleteSession(id: string): Promise<void> {
		return this.req('DELETE', `/auth/session/${id}`, false);
	}

	async fetchChannel(id: string): Promise<Channel> {
		return (
			this.cache?.channels.find((channel) => channel._id == id) ??
			this.req('GET', `/channels/${id}`, true)
		);
	}

	setSettings(settings: Partial<Record<keyof Settings, unknown>>): Promise<void> {
		return this.req(
			'POST',
			`/sync/settings/set?timestamp=${Date.now()}`,
			false,
			JSON.stringify(settings)
		);
	}

	fetchDirectMessages(): Promise<
		Exclude<Channel, { channel_type: 'TextChannel' | 'VoiceChannel' }>[]
	> {
		return this.req('GET', '/users/dms', true);
	}

	async fetchSettings<K extends string>(keys: K[]): Promise<Record<K, [number, string]>> {
		return this.req('POST', '/sync/settings/fetch', true, JSON.stringify({ keys }));
	}

	fetchMembers(server_id: string): Promise<AllMemberResponse> {
		return this.req('GET', `/servers/${server_id}/members`, true);
	}

	async fetchMember(server_id: string, member_id: string, user_id?: string): Promise<Member> {
		const makeRequest = () =>
			this.req<Member>('GET', `/servers/${server_id}/members/${member_id}`, true);

		if (user_id == undefined) {
			return makeRequest();
		}

		return (
			this.cache?.members.find(
				(member) => member._id.server == server_id && member._id.user == user_id
			) ?? makeRequest()
		);
	}

	queryMessages(
		channel_id: string,
		data_query_messages: Omit<OptionsMessageSearch, 'query'>
	): Promise<BulkMessageResponse> {
		const params =
			'?' +
			new URLSearchParams(
				Object.entries(data_query_messages).map(([key, value]) => [key, value.toString()])
			);
		return this.req('GET', `/channels/${channel_id}/messages${params}`, true);
	}

	sendMessage(channel_id: string, data_message_send: DataMessageSend): Promise<Message> {
		return this.req(
			'POST',
			`/channels/${channel_id}/messages`,
			true,
			JSON.stringify(data_message_send)
		);
	}

	editMessage(
		channel_id: string,
		message_id: string,
		data_edit_message: DataEditMessage
	): Promise<Message> {
		return this.req(
			'PATCH',
			`/channels/${channel_id}/messages/${message_id}`,
			true,
			JSON.stringify(data_edit_message)
		);
	}

	deleteMessage(channel_id: string, message_id: string): Promise<void> {
		return this.req('DELETE', `/channels/${channel_id}/messages/${message_id}`, false);
	}

	async fetchServer(id: string): Promise<Server> {
		return (
			this.cache?.servers.find((server) => server._id == id) ??
			(await this.req('GET', `/servers/${id}`, true))
		);
	}

	fetchSessions(): Promise<SessionInfo[]> {
		return this.req('GET', '/auth/session/all', true);
	}

	async fetchUser(id: string): Promise<User> {
		return (
			this.cache?.users.find((user) => user._id == id) ?? this.req('GET', `/users/${id}`, true)
		);
	}

	fetchUserProfile(id: string): Promise<UserProfile> {
		return this.req('GET', `/users/${id}/profile`, true);
	}
}
