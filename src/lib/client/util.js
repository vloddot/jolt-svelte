const PING_HEARTBEAT_INTERVAL = 30;
const PONG_TIMEOUT = 10;

function mapById(list, callback) {
	if (callback == undefined) {
		return new Map(list.map((object) => [object._id, object]));
	} else {
		return new Map(list.map((object) => [callback(object._id), object]));
	}
}

export { PING_HEARTBEAT_INTERVAL, PONG_TIMEOUT, mapById };
