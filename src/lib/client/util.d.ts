/**
 * Amount of seconds between each ping heartbeat.
 */
export declare const PING_HEARTBEAT_INTERVAL = 30;

/**
 * If the web socket doesn't respond to a ping with a pong in `PONG_TIMEOUT` seconds,
 * the `WebSocketClient` disconnects.
 */
export declare const PONG_TIMEOUT = 10;

export declare const mapById: {
	<Id, O extends { _id: Id }>(list: O[]): Map<Id, O>;
	<Id, Cid, O extends { _id: Id }>(list: O[], callback: (id: Id) => Cid): Map<Cid, O>;
};
