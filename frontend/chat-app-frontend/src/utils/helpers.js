export const getUsernameFromId = (userList, id) => {
  return userList.find(user => user.id === id)?.username || id;
};
