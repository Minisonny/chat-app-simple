import {
  Button,
  Card,
  Header,
  Icon,
  Input,
  Stack,
  Banner
} from "@nordhealth/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { createMessages, listMessages } from "../../api/messageApi";
import { getUsernameFromId } from "../../utils/helpers";
import { withUnauthorized } from "../empty-state/Unauthorized";

const MessageView = ({ authorized, userList }) => {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    listMessages(id).then(res => setMessages(res));
  }, [id]);

  const onMessageSend = async () => {
    try {
      await createMessages(id, newMsg);
    } catch (err) {
      setError(err.response.data.errors.msg);
    }

    setNewMsg("");
  };

  const onEnterPressed = async e => {
    if (e.key === "Enter") {
      await onMessageSend();
    }
  };

  return (
    <>
      <Header slot="header">
        <h1 className="n-typescale-l">Message list</h1>
      </Header>
      {withUnauthorized(
        <Stack gap="l">
          <Stack gap="l">
            {messages.map(msg => (
              <Card key={`msg-${msg.id}`} className="msg-card">
                <h2 slot="header">{getUsernameFromId(userList, msg.sender)}</h2>
                {msg.content}
                <div slot="footer">Updated at: {msg.updatedAt}</div>
              </Card>
            ))}
          </Stack>
          {error && <Banner variant="danger">{error}</Banner>}
          <Stack direction="horizontal" alignItems="center">
            <Input
              className="message-input"
              expand
              hideLabel
              value={newMsg}
              onChange={e => setNewMsg(e.target.value)}
              onKeyUp={onEnterPressed}
              placeholder="Aa"
            ></Input>
            <Button variant="plain" size="s" onClick={onMessageSend}>
              <Icon name="interface-play" size="l"></Icon>
            </Button>
          </Stack>
        </Stack>,
        authorized
      )}
    </>
  );
};

export default MessageView;
