import { User } from "../types/common";

export const getUsernameFromId = (userList: Array<User>, id: number): string => {
  return userList.find(user => user.id === id)?.username || "Unknown";
};
