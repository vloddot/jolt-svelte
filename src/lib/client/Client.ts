import EventEmitter from 'eventemitter3';
import { APIClient } from './APIClient';
import { AutumnClient } from './AutumnClient';
import { WebSocketClient, type ServerMessage } from './WebSocketClient';
import { mapById } from './util';

export type Events<T extends { type: string | number | symbol }> = {
	[K in Exclude<T['type'], 'Bulk'>]: (event: Extract<T, { type: K }>) => void;
};

type Cache = {
	channels: Map<Channel['_id'], Channel>;
	emojis: Map<Emoji['_id'], Emoji>;
	members: Map<Member['_id'], Member>;
	servers: Map<Server['_id'], Server>;
	users: Map<User['_id'], User>;
};

export class Client extends EventEmitter<Events<ServerMessage>> {
	cache: Cache = {
		channels: new Map(),
		emojis: new Map(),
		members: new Map(),
		servers: new Map(),
		users: new Map()
	};

	api = new APIClient();
	websocket = new WebSocketClient();
	autumn = new AutumnClient();
	unreads = new Map<ChannelUnread['_id']['channel'], ChannelUnread>();
	user: User | undefined = undefined;

	get ready(): boolean {
		return this.cache != undefined;
	}

	authenticate(token: string) {
		this.api.token = token;
		this.websocket.authenticate(token);

		this.fetchUser('@me').then((user) => (this.user = user));
		this.fetchUnreads().then(
			(unreads) =>
				(this.unreads = mapById<
					ChannelUnread['_id'],
					ChannelUnread['_id']['channel'],
					ChannelUnread
				>(unreads, (id) => id.channel))
		);

		this.websocket.on('serverEvent', (event) => this.#handleEvent(event));
	}

	async destroy() {
		await this.logout();
		this.websocket.disconnect();
		this.api.token = undefined;
		this.user = undefined;
		this.unreads = new Map();
		this.cache = {
			channels: new Map(),
			emojis: new Map(),
			members: new Map(),
			servers: new Map(),
			users: new Map()
		};
	}

	#handleEvent(event: ServerMessage) {
		switch (event.type) {
			case 'Bulk': {
				for (const e of event.v) {
					this.#handleEvent(e);
				}
				break;
			}
			case 'Ready': {
				this.cache.users = mapById(event.users);
				this.cache.channels = mapById(event.channels);
				this.cache.servers = mapById(event.servers);
				this.cache.members = mapById(event.members);
				this.cache.emojis = mapById(event.emojis);

				this.emit('Ready', event);
				break;
			}
			case 'ChannelCreate': {
				this.cache.channels.set(event._id, event);
				this.emit('ChannelCreate', event);
				break;
			}
			case 'ChannelDelete': {
				// only emit if the channel existed
				if (this.cache.channels.delete(event.id)) {
					this.emit('ChannelDelete', event);
				}
				break;
			}
			case 'ChannelUpdate': {
				const channel = this.cache.channels.get(event.id);

				if (channel == undefined) {
					return;
				}

				if (event.clear != undefined) {
					for (const clear of event.clear) {
						if (
							channel.channel_type != 'Group' &&
							channel.channel_type != 'TextChannel' &&
							channel.channel_type != 'VoiceChannel'
						) {
							break;
						}

						switch (clear) {
							case 'Description':
								channel.description = undefined;
								break;
							case 'Icon':
								channel.icon = undefined;
								break;
							case 'DefaultPermissions':
								if (channel.channel_type != 'Group') {
									channel.default_permissions = undefined;
								}
								break;
						}
					}
				}

				for (const [key, value] of Object.entries(event.data)) {
					channel[key as keyof Channel] = value;
				}

				this.cache.channels.set(event.id, channel);
				this.emit('ChannelUpdate', event);
				break;
			}
			case 'ServerCreate': {
				for (const channel of event.channels) {
					this.cache.channels.set(channel._id, channel);
				}

				this.cache.servers.set(event.id, event.server);

				this.emit('ServerCreate', event);
				break;
			}
			case 'ServerDelete': {
				const server = this.cache.servers.get(event.id);
				if (server == undefined) {
					return;
				}

				for (const channel of server.channels) {
					this.cache.channels.delete(channel);
				}

				this.cache.servers.delete(server._id);
				this.emit('ServerDelete', event);
				break;
			}
			case 'ServerUpdate': {
				const server = this.cache.servers.get(event.id);

				if (server == undefined) {
					return;
				}

				if (event.clear != undefined) {
					for (const clear of event.clear) {
						switch (clear) {
							case 'Description':
								server.description = undefined;
								break;
							case 'Icon':
								server.icon = undefined;
								break;
							case 'Categories':
								server.categories = undefined;
								break;
							case 'SystemMessages':
								server.system_messages = undefined;
								break;
							case 'Banner':
								server.banner = undefined;
								break;
						}
					}
				}

				for (const [key, value] of Object.entries(event.data)) {
					// @ts-expect-error it doesn't want me to set it
					server[key as keyof Server] = value;
				}

				this.cache.servers.set(event.id, server);
				this.emit('ServerUpdate', event);
				break;
			}
			case 'ChannelGroupJoin': {
				const group = this.cache.channels.get(event.id);
				if (group == undefined || group.channel_type != 'Group') {
					return;
				}

				group.recipients.push(event.user);
				this.cache.channels.set(event.id, group);
				this.emit('ChannelGroupJoin', event);
				break;
			}
			case 'ChannelGroupLeave': {
				const group = this.cache.channels.get(event.id);
				if (group == undefined || group.channel_type != 'Group') {
					return;
				}

				group.recipients = group.recipients.filter((user) => user != event.user);
				this.cache.channels.set(event.id, group);
				this.emit('ChannelGroupLeave', event);
				break;
			}
			case 'ServerMemberUpdate': {
				const member = this.cache.members.get(event.id);
				if (member == undefined) {
					return;
				}

				if (event.clear != undefined) {
					for (const clear of event.clear) {
						switch (clear) {
							case 'Nickname':
								member.nickname = undefined;
								break;
							case 'Avatar':
								member.avatar = undefined;
								break;
							case 'Roles':
								member.roles = undefined;
								break;
							case 'Timeout':
								member.timeout = undefined;
						}
					}
				}

				for (const [key, value] of Object.entries(event.data)) {
					// @ts-expect-error it doesn't want me to set it
					member[key as keyof Member] = value;
				}

				this.cache.members.set(member._id, member);
				this.emit('ServerMemberUpdate', event as never);
				break;
			}
			case 'ServerRoleUpdate': {
				const server = this.cache.servers.get(event.id);
				if (server == undefined || server.roles == undefined) {
					return;
				}

				for (const [key, value] of Object.entries(event.data)) {
					// @ts-expect-error it doesn't want me to set it
					server.roles[key as keyof Role] = value;
				}

				this.cache.servers.set(event.id, server);
				break;
			}
			case 'ServerRoleDelete': {
				const server = this.cache.servers.get(event.id);

				if (server == undefined || server.roles == undefined) {
					return;
				}

				server.roles = Object.fromEntries(
					Object.entries(server.roles).filter(([id]) => id != event.role_id)
				);

				this.cache.servers.set(event.id, server);
				this.emit('ServerRoleDelete', event);
				break;
			}
			case 'UserUpdate': {
				const user = this.cache.users.get(event.id);
				if (user == undefined) {
					return;
				}

				if (event.clear != undefined) {
					for (const clear of event.clear) {
						switch (clear) {
							case 'Avatar': {
								user.avatar = undefined;
								break;
							}
							case 'StatusText': {
								if (user.status != undefined) {
									user.status.text = undefined;
								}
								break;
							}
							case 'StatusPresence': {
								if (user.status != undefined) {
									user.status.presence = undefined;
								}
								break;
							}
							case 'ProfileContent': {
								if (user.profile != undefined) {
									user.profile.content = undefined;
								}
								break;
							}
							case 'ProfileBackground': {
								if (user.profile != undefined) {
									user.profile.background = undefined;
								}
								break;
							}
							case 'DisplayName': {
								user.display_name = undefined;
								break;
							}
						}
					}
				}

				for (const [key, value] of Object.entries(event.data)) {
					// @ts-expect-error it doesn't want me to set it
					user[key as keyof User] = value;
				}

				this.cache.users.set(event.id, user);
				this.emit('UserUpdate', event);
				break;
			}
			case 'UserRelationship': {
				this.cache.users.set(event.user._id, event.user);
				this.emit('UserRelationship', event);
				break;
			}
			case 'UserPresence': {
				const user = this.cache.users.get(event.id);
				if (user == undefined) {
					return;
				}

				user.online = event.online;

				this.cache.users.set(event.id, user);
				this.emit('UserPresence', event);
				break;
			}
			case 'UserPlatformWipe': {
				const user = this.cache.users.get(event.user_id);
				if (user == undefined) {
					return;
				}

				user.flags = event.flags;
				this.cache.users.set(event.user_id, user);
				this.emit('UserPlatformWipe', event);
				break;
			}
			case 'EmojiCreate': {
				this.cache.emojis.set(event._id, event);
				this.emit('EmojiCreate', event);
				break;
			}
			case 'EmojiDelete': {
				if (this.cache.emojis.delete(event.id)) {
					this.emit('EmojiDelete', event);
				}
				break;
			}
			case 'Auth':
			case 'UserSettingsUpdate':
			case 'ServerMemberJoin':
			case 'ServerMemberLeave':
			case 'Message':
			case 'MessageUpdate':
			case 'MessageAppend':
			case 'MessageDelete':
			case 'MessageReact':
			case 'MessageUnreact':
			case 'MessageRemoveReaction':
			case 'BulkMessageDelete':
			case 'ChannelStartTyping':
			case 'ChannelStopTyping':
			case 'ChannelAck':
				this.emit(event.type, event as never);
				break;
		}
	}

	async login(data: DataLogin): Promise<ResponseLogin> {
		return this.api
			.post('/auth/session/login', JSON.stringify(data))
			.then((response) => response.json());
	}

	async logout(): Promise<void> {
		await this.api.post('/auth/session/logout');
	}

	async revokeSession(id: string): Promise<void> {
		await this.api.delete(`/auth/session/${id}`);
	}

	async revokeAllSessions(revoke_self: boolean): Promise<void> {
		await this.api.delete(`/auth/session/all?revoke_self=${revoke_self}`);
	}

	async createServer(body: DataCreateServer): Promise<CreateServerResponse> {
		return this.api
			.post('/servers/create', JSON.stringify(body))
			.then((response) => response.json());
	}

	async changeUsername(username: string, password: string): Promise<User> {
		return this.api
			.patch('/users/@me/username', JSON.stringify({ username, password }))
			.then((response) => response.json());
	}

	async openDM(id: string): Promise<Extract<Channel, { channel_type: 'DirectMessage' }>> {
		return this.api.get(`/users/${id}/dm`).then((response) => response.json());
	}

	async joinCall(channel_id: string): Promise<string> {
		return this.api
			.post(`/channels/${channel_id}/join_call`)
			.then((response) => response.json())
			.then(({ token }) => token);
	}

	async acceptFriend(id: string): Promise<User> {
		return this.api.put(`/channels/${id}/friend`).then((response) => response.json());
	}

	async removeFriend(id: string): Promise<User> {
		return this.api.delete(`/users/${id}/friend`).then((response) => response.json());
	}

	async editServer(id: string, data: DataEditServer): Promise<Server> {
		return this.api
			.patch(`/servers/${id}`, JSON.stringify(data))
			.then((response) => response.json());
	}

	async fetchChannel(id: string): Promise<Channel> {
		const channel = this.cache.channels.get(id);

		if (channel == undefined) {
			const result: Channel = await this.api
				.get(`/channels/${id}`)
				.then((response) => response.json());
			this.cache.channels.set(result._id, result);
			return result;
		}

		return channel;
	}

	async fetchDirectMessages(): Promise<
		Exclude<Channel, { channel_type: 'TextChannel' | 'VoiceChannel' }>[]
	> {
		return this.api.get('/users/dms').then((response) => response.json());
	}

	async ackMessage(channel_id: string, message_id: string): Promise<void> {
		await this.api.put(`/channels/${channel_id}/ack/${message_id}`);
	}

	async fetchSettings<K extends string>(
		keys: K[]
	): Promise<Record<K, [number, string] | undefined>> {
		return this.api
			.post('/sync/settings/fetch', JSON.stringify({ keys }))
			.then((response) => response.json());
	}

	async fetchUnreads(): Promise<ChannelUnread[]> {
		return this.api.get('/sync/unreads').then((response) => response.json());
	}

	async setSettings(
		settings: Record<string, string | boolean | number | object>,
		timestamp = Date.now()
	): Promise<void> {
		for (const [key, value] of Object.entries(settings)) {
			settings[key] = typeof value == 'string' ? value : JSON.stringify(value);
		}

		await this.api.post(`/sync/settings/set?timestamp=${timestamp}`, JSON.stringify(settings));
	}

	async fetchMembers(server_id: string, exclude_offline = false): Promise<AllMemberResponseMap> {
		return await this.api
			.get(`/servers/${server_id}/members?exclude_offline=${exclude_offline}`)
			.then((response) => response.json())
			.then((response: AllMemberResponse) => {
				const users = mapById<User['_id'], User>(response.users);

				return {
					members:
						response.members.length < 10_000
							? response.members
							: response.members.filter((member) => users.get(member._id.user)?.online),
					users
				};
			});
	}

	async fetchMessage(channel_id: string, message_id: string): Promise<Message> {
		return this.api
			.get(`/channels/${channel_id}/messages/${message_id}`)
			.then((response) => response.json());
	}

	async queryMessages(
		channel_id: string,
		data_query_messages: OptionsQueryMessages
	): Promise<BulkMessageResponse> {
		const params =
			'?' +
			new URLSearchParams(
				Object.entries(data_query_messages).flatMap(([key, value]) =>
					value == undefined ? [] : [[key, value.toString()]]
				)
			);
		return this.api
			.get(`/channels/${channel_id}/messages${params}`)
			.then((response) => response.json());
	}

	async sendMessage(channel_id: string, data_message_send: DataMessageSend): Promise<Message> {
		return this.api
			.post(`/channels/${channel_id}/messages`, JSON.stringify(data_message_send))
			.then((response) => response.json());
	}

	async editMessage(
		channel_id: string,
		message_id: string,
		data_edit_message: DataEditMessage
	): Promise<Message> {
		return this.api
			.patch(`/channels/${channel_id}/messages/${message_id}`, JSON.stringify(data_edit_message))
			.then((response) => response.json());
	}

	async deleteMessage(channel_id: string, message_id: string): Promise<void> {
		await this.api.delete(`/channels/${channel_id}/messages/${message_id}`);
	}

	async fetchServer(id: string): Promise<Server> {
		const server = this.cache.servers.get(id);

		if (server == undefined) {
			const result: Server = await this.api
				.get(`/servers/${id}`)
				.then((response) => response.json());
			this.cache.servers.set(result._id, result);
			return result;
		}

		return server;
	}

	async fetchSessions(): Promise<SessionInfo[]> {
		return this.api.get('/auth/session/all').then((response) => response.json());
	}

	async fetchUser(id: string): Promise<User> {
		const user = this.cache.users.get(id);

		if (user == undefined) {
			const result: User = await this.api.get(`/users/${id}`).then((response) => response.json());

			this.cache.users.set(result._id, result);
			return result;
		}

		return user;
	}

	async fetchUserProfile(id: string): Promise<UserProfile> {
		return this.api.get(`/users/${id}/profile`).then((response) => response.json());
	}
}
