import axios from "axios";
import { SERVER_URL } from "../utils/constants";
import { getToken } from "./tokenManager";

export const listThreads = async () => {
  const headers = {
    headers: { Authorization: getToken() }
  };

  return await axios
    .get(`${SERVER_URL}/threads`, headers)
    .then(res => res.data);
};

export const createThread = async (name, participantId) => {
  const headers = {
    headers: { Authorization: getToken() }
  };

  const payload = { name, participantId };

  return await axios
    .post(`${SERVER_URL}/threads`, payload, headers)
    .then(res => res.data);
};

export const listThreadMessages = async threadId => {
  const headers = {
    headers: { Authorization: getToken() }
  };

  return await axios
    .get(`${SERVER_URL}/threads/${threadId}/messages`, headers)
    .then(res => res.data);
};
