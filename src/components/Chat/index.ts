export interface Reply {
	message: Message;
	mention: boolean;
}

export const membersKey = Symbol();
export const usersKey = Symbol();
export const repliesKey = Symbol();
export const sessionUIDKey = Symbol();
export const lowDataModeKey = Symbol();
export const selectedServerIDKey = Symbol();
