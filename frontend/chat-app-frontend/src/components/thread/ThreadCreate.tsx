import React from "react";
import {
  Button,
  Select,
  Header,
  Input,
  Stack,
  Banner
} from "@nordhealth/react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { createThread } from "../../api/threadApi";
import { NullableString } from "../../types/common";
import { User } from "../../types/common";
import { withUnauthorized } from "../empty-state/Unauthorized";

interface ThreadCreateProps {
  authorized: boolean;
  userList: Array<User>;
  onThreadCreated: (title: string) => void;
}

const ThreadCreate = ({
  authorized,
  userList,
  onThreadCreated
}: ThreadCreateProps) => {
  const [title, setTitle] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");
  const [error, setError] = useState<NullableString>(null);

  const navigate = useNavigate();

  const handleCreate = async () => {
    try {
      await createThread(title, selectedUserId);
      onThreadCreated(title);
      setError(null);
      navigate("/thread");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const { msg, param } = err?.response?.data?.errors[0] || {};
        setError(getErrorMessage(msg, param));
      }
    }
  };

  const getErrorMessage = (msg: string, field: string) => {
    return `${msg}. Field: ${
      field === "participantId" ? "Select a participant" : "Title"
    }`;
  };

  return (
    <>
      <Header slot="header">
        <h1 className="n-typescale-l">Create a new thread</h1>
      </Header>
      {withUnauthorized(
        <Stack gap="l">
          {error && <Banner variant="danger">{error}</Banner>}
          <Input
            label="Title"
            expand
            required
            name="title"
            type="text"
            value={title}
            onChange={e => setTitle((e.target as HTMLInputElement).value)}
            placeholder="To be or not to be?"
          ></Input>
          <Select
            name="page-size"
            value={selectedUserId}
            label="Select a participant"
            required
            onChange={e =>
              setSelectedUserId((e.target as HTMLInputElement).value)
            }
          >
            {userList.map(user => (
              <option key={`user-option-${user.id}`} value={user.id}>
                {user.username}
              </option>
            ))}
          </Select>
          <Button type="submit" expand variant="primary" onClick={handleCreate}>
            Create
          </Button>
        </Stack>,
        authorized
      )}
    </>
  );
};

export default ThreadCreate;
