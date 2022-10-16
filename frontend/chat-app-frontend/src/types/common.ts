export type Nullable<T> = T | null;

export type NullableString = Nullable<string>;

export interface User {
  id: number;
  username: string;
};

export interface UserThread {
  userId: number;
  threadId: number;
};

export interface Thread {
  id: number;
  name: string;
  UserThread: UserThread;
};
