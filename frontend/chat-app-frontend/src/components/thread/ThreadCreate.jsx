import { Button, Select, Header, Input, Stack } from "@nordhealth/react";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { createMessages } from "../../api/messageApi";
import { createThread } from "../../api/threadApi";

const ThreadCreate = ({ userList, onThreadCreated }) => {
  const [title, setTitle] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleCreate = async () => {
    try {
      await createThread(title, selectedUserId);
      onThreadCreated(title);
      setError(null);
      navigate("/thread");
    } catch (err) {
      setError(err);
    }
  };

  return (
    <>
      <Header slot="header">
        <h1 className="n-typescale-l">Create a new thread</h1>
      </Header>
      <Stack gap="l">
        <Input
          label="Title"
          expand
          required
          name="title"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="To be or not to be?"
        ></Input>
        <Select
          name="page-size"
          value={selectedUserId}
          label="Select a participant"
          required
          onChange={e => setSelectedUserId(e.target.value)}
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
      </Stack>
    </>
  );
};

export default ThreadCreate;
