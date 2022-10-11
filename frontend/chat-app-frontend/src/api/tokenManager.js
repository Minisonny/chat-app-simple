let token = null;

export const unsetToken = () => {
  token = null;
};

export const setToken = newToken => {
  token = `Bearer ${newToken}`;
};

export const getToken = () => token;
