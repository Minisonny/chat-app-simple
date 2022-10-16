import moment from "moment";
import { User } from "../types/common";

export const getUsernameFromId = (
  userList: Array<User>,
  id: number
): string => {
  return userList.find(user => user.id === id)?.username || "Unknown";
};

export const getHumanFriendlyDate = (date: string) => {
  const momentDate = moment(date);
  const isToday = momentDate.isSame(moment(), "day");

  return momentDate.format(
    `${isToday ? "[Today]" : "MMMM D, YYYY"} [at] h:mm A`
  );
};
