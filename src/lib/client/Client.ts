import EventEmitter from 'eventemitter3';
import { APIClient } from './APIClient';
import { AutumnClient } from './AutumnClient';
import { WebSocketClient, type ServerMessage } from './WebSocketClient';

export type Events<T extends { type: string | number | symbol }> = {
	[K in Exclude<T['type'], 'Bulk'>]: (event: Omit<Extract<T, { type: K }>, 'type'>) => void;
};

export class Client extends EventEmitter<Events<ServerMessage>> {
	api: APIClient = new APIClient();
	websocket: WebSocketClient = new WebSocketClient();
	autumn: AutumnClient = new AutumnClient();
	user: User | undefined = undefined;

	get ready(): boolean {
		return this.api.cache != undefined;
	}

	authenticate(token: string) {
		this.api.token = token;
		this.websocket.authenticate(token);

		this.api.fetchUser('@me').then((user) => (this.user = user));
		this.websocket.on('serverEvent', (event) => this.#handleEvent(event));
	}

	async destroy() {
		await this.api.logout();
		this.api.token = undefined;
		this.websocket.disconnect();
		this.api.cache = {
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
				this.api.cache.users = new Map(event.users.map((user) => [user._id, user]));
				this.api.cache.channels = new Map(event.channels.map((channel) => [channel._id, channel]));
				this.api.cache.servers = new Map(event.servers.map((server) => [server._id, server]));
				this.api.cache.members = new Map(event.members.map((member) => [member._id, member]));
				this.api.cache.emojis = new Map(event.emojis.map((emoji) => [emoji._id, emoji]));

				this.emit('Ready', event);
				break;
			}
			case 'ChannelCreate': {
				this.api.cache.channels.set(event._id, event);
				this.emit('ChannelCreate', event);
				break;
			}
			case 'ChannelDelete': {
				// only emit if the channel existed
				if (this.api.cache.channels.delete(event.id)) {
					this.emit('ChannelDelete', event);
				}
				break;
			}
			case 'ChannelUpdate': {
				const channel = this.api.cache.channels.get(event.id);

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

				this.api.cache.channels.set(event.id, channel);
				this.emit('ChannelUpdate', event);
				break;
			}
			case 'ServerCreate': {
				for (const channel of event.channels) {
					this.api.cache.channels.set(channel._id, channel);
				}

				this.api.cache.servers.set(event.id, event.server);

				this.emit('ServerCreate', event);
				break;
			}
			case 'ServerDelete': {
				const server = this.api.cache.servers.get(event.id);
				if (server == undefined) {
					return;
				}

				for (const channel of server.channels) {
					this.api.cache.channels.delete(channel);
				}

				this.api.cache.servers.delete(server._id);
				this.emit('ServerDelete', event);
				break;
			}
			case 'ServerUpdate': {
				const server = this.api.cache.servers.get(event.id);

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

				this.api.cache.servers.set(event.id, server);
				this.emit('ServerUpdate', event);
				break;
			}
			case 'ChannelGroupJoin': {
				const group = this.api.cache.channels.get(event.id);
				if (group == undefined || group.channel_type != 'Group') {
					return;
				}

				group.recipients.push(event.user);
				this.api.cache.channels.set(event.id, group);
				this.emit('ChannelGroupJoin', event);
				break;
			}
			case 'ChannelGroupLeave': {
				const group = this.api.cache.channels.get(event.id);
				if (group == undefined || group.channel_type != 'Group') {
					return;
				}

				group.recipients = group.recipients.filter((user) => user != event.user);
				this.api.cache.channels.set(event.id, group);
				this.emit('ChannelGroupJoin', event);
				break;
			}
			case 'ServerMemberUpdate': {
				const member = this.api.cache.members.get(event.id);
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

				this.api.cache.members.set(member._id, member);
				this.emit('ServerMemberUpdate', event as never);
				break;
			}
			case 'ServerRoleUpdate': {
				const server = this.api.cache.servers.get(event.id);
				if (server == undefined || server.roles == undefined) {
					return;
				}

				for (const [key, value] of Object.entries(event.data)) {
					// @ts-expect-error it doesn't want me to set it
					server.roles[key as keyof Role] = value;
				}

				this.api.cache.servers.set(event.id, server);
				break;
			}
			case 'ServerRoleDelete': {
				const server = this.api.cache.servers.get(event.id);

				if (server == undefined || server.roles == undefined) {
					return;
				}

				server.roles = Object.fromEntries(
					Object.entries(server.roles).filter(([id]) => id != event.role_id)
				);

				this.api.cache.servers.set(event.id, server);
				this.emit('ServerRoleDelete', event);
				break;
			}
			case 'UserUpdate': {
				const user = this.api.cache.users.get(event.id);
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

				this.api.cache.users.set(event.id, user);
				this.emit('UserUpdate', event);
				break;
			}
			case 'UserRelationship': {
				this.api.cache.users.set(event.user._id, event.user);
				this.emit('UserRelationship', event);
				break;
			}
			case 'UserPresence': {
				const user = this.api.cache.users.get(event.id);
				if (user == undefined) {
					return;
				}

				user.online = event.online;

				this.api.cache.users.set(event.id, user);
				this.emit('UserPresence', event);
				break;
			}
			case 'UserPlatformWipe': {
				const user = this.api.cache.users.get(event.user_id);
				if (user == undefined) {
					return;
				}

				user.flags = event.flags;
				this.api.cache.users.set(event.user_id, user);
				this.emit('UserPlatformWipe', event);
				break;
			}
			case 'EmojiCreate': {
				this.api.cache.emojis.set(event._id, event);
				this.emit('EmojiCreate', event);
				break;
			}
			case 'EmojiDelete': {
				if (this.api.cache.emojis.delete(event.id)) {
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
}
