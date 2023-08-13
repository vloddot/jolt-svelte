export interface Reply {
  message: Message;
  mention: boolean;
}

export const membersKey = Symbol();
export const usersKey = Symbol();
export const repliesKey = Symbol();
