import EventEmitter from 'eventemitter3';
import { APIClient } from './APIClient';
import { type ServerMessage, WebSocketClient } from './WebSocketClient';

export type Events = {
	[K in Exclude<ServerMessage['type'], 'Bulk'>]: (
		event: Omit<Extract<ServerMessage, { type: K }>, 'type'>
	) => void;
};

export class Client extends EventEmitter<Events> {
	api: APIClient;
	websocket: WebSocketClient;

	constructor() {
		super();
		this.api = new APIClient();
		this.websocket = new WebSocketClient();
	}

	get ready(): boolean {
		return this.api.cache != undefined;
	}

	authenticate(token: string) {
		this.api.token = token;
		this.websocket.authenticate(token);

		this.websocket.on('serverEvent', (event) => this.#handleEvent(event));
	}

	#handleEvent(event: ServerMessage) {
		switch (event.type) {
			case 'Bulk':
				for (const e of event.v) {
					this.#handleEvent(e);
				}
				break;
			case 'Ready':
				this.api.cache = event;
				this.emit('Ready', event);
				break;
			case 'Message':
			case 'MessageUpdate':
			case 'MessageAppend':
			case 'MessageDelete':
			case 'MessageReact':
			case 'MessageUnreact':
			case 'MessageRemoveReaction':
			case 'BulkMessageDelete':
			case 'ChannelCreate':
			case 'ChannelUpdate':
			case 'ChannelDelete':
			case 'ChannelGroupJoin':
			case 'ChannelGroupLeave':
			case 'ChannelStartTyping':
			case 'ChannelStopTyping':
			case 'ChannelAck':
			case 'ServerCreate':
			case 'ServerUpdate':
			case 'ServerDelete':
			case 'ServerMemberUpdate':
			case 'ServerMemberJoin':
			case 'ServerMemberLeave':
			case 'ServerRoleUpdate':
			case 'ServerRoleDelete':
			case 'UserUpdate':
			case 'UserRelationship':
			case 'UserPresence':
			case 'UserSettingsUpdate':
			case 'UserPlatformWipe':
			case 'EmojiCreate':
			case 'EmojiDelete':
			case 'Auth':
				this.emit(event.type, event as never);
				break;
		}
	}
}
