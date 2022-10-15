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

export const createMessages = async threadId => {
  const headers = {
    headers: { Authorization: getToken() }
  };

  return await axios
    .get(`${SERVER_URL}/threads/${threadId}/messages`, headers)
    .then(res => res.data);
};
