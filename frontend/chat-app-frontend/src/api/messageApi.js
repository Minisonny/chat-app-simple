import axios from "axios";
import { SERVER_URL } from "../utils/constants";
import { getToken } from "./tokenManager";

export const listMessages = async threadId => {
  const headers = {
    headers: { Authorization: getToken() }
  };

  return await axios
    .get(`${SERVER_URL}/threads/${threadId}/messages`, headers)
    .then(res => res.data);
};

export const createMessages = async (threadId, content) => {
  const headers = {
    headers: { Authorization: getToken() }
  };

  const payload = { content };

  return await axios
    .post(`${SERVER_URL}/threads/${threadId}/messages`, payload, headers)
    .then(res => res.data);
};
