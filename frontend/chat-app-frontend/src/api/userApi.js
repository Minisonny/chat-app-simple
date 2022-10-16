import axios from "axios";
import { SERVER_URL } from "../utils/constants";
import { getToken, setToken } from "./tokenManager";

export const registerUser = async (username, password, passwordConfirm) => {
  const payload = { username, password, passwordConfirm };
  return await axios.post(`${SERVER_URL}/auth/register`, payload);
};

export const loginUser = async (username, password) => {
  const payload = { username, password };

  const response = await axios.post(`${SERVER_URL}/auth/login`, payload);

  setToken(response.data.token);

  return {
    id: response.data.id,
    username: response.data.username
  };
};

export const listUsers = async () => {
  const headers = {
    headers: { Authorization: getToken() }
  };

  return await axios.get(`${SERVER_URL}/users`, headers).then(res => res.data);
};
