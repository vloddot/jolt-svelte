/**
 * Amount of seconds between each ping heartbeat.
 */
export const PING_HEARTBEAT_INTERVAL = 30;

/**
 * If the web socket doesn't respond to a ping with a pong in `PONG_TIMEOUT` seconds,
 * the `WebSocketClient` disconnects.
 */
export const PONG_TIMEOUT = 10;
