type Session = {
	/** @description Unique Id */
	_id: string;
	/** @description User Id */
	user_id: string;
	/** @description Session token */
	token: string;
	/** @description Display name */
	name: string;
	/** @description Web Push subscription */
	subscription?: WebPushSubscription;
};
