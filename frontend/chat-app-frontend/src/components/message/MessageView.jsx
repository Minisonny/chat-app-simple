import { Card, Header, Stack, Divider } from "@nordhealth/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { listMessages } from "../../api/messageApi";
import { getUsernameFromId } from "../../utils/helpers";

const MessageView = ({ userList }) => {
  const [messages, setMessages] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    listMessages(id).then(res => setMessages(res));
  }, [id]);

  return (
    <>
      <Header slot="header">
        <h1 className="n-typescale-l">Message list</h1>
      </Header>
      <Stack gap="l">
        {messages.map(msg => (
          <Card key={`msg-${msg.id}`} className="msg-card">
            <h2 slot="header">{getUsernameFromId(userList, msg.sender)}</h2>
            {msg.content}
            <div slot="footer">Updated at: {msg.updatedAt}</div>
          </Card>
        ))}
      </Stack>
    </>
  );
};

export default MessageView;
