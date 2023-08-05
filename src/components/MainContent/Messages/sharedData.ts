export interface Reply {
  message: Message;
  mention: boolean;
}

export const bulkMessageInfoKey = Symbol();
export const repliesKey = Symbol();
