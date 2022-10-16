import {
  Button,
  Card,
  Header,
  Icon,
  Input,
  Stack,
  Banner
} from "@nordhealth/react";
import SocketIOClient, { Socket } from "socket.io-client";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { createMessages, listMessages } from "../../api/messageApi";
import { getHumanFriendlyDate, getUsernameFromId } from "../../utils/helpers";
import { withUnauthorized } from "../empty-state/Unauthorized";
import { SERVER_URL } from "../../utils/constants";
import { NullableString, Thread } from "../../types/common";
import { User } from "../../types/common";
import axios from "axios";

interface MessageViewProps {
  authorized: boolean;
  userList: Array<User>;
}

type MessageThreadInfo = Omit<Thread, "UserThread">;

interface Message {
  id: number;
  content: string;
  sender: number;
  threadId: number;
  createdAt: string;
  updatedAt: string;
  user: User;
  thread: MessageThreadInfo;
}

const MessageView = ({ authorized, userList }: MessageViewProps) => {
  const [messages, setMessages] = useState<Array<Message>>([]);
  const [newMsg, setNewMsg] = useState<string>("");
  const [error, setError] = useState<NullableString>(null);
  const { id } = useParams();

  useEffect(() => {
    // backend doesn't check token for socket handshake?
    const io: Socket = SocketIOClient(SERVER_URL, {
      path: "/socket",
      query: { thread: id }
    });

    io.on("message", (newMessage: Message) =>
      setMessages((prevMessages: Array<Message>) =>
        prevMessages.concat(newMessage)
      )
    );

    return () => {
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    listMessages(id).then(res => setMessages(res));
  }, [id]);

  const onMessageSend = async () => {
    try {
      // new message is handled and added to the UI by socket IO
      await createMessages(id, newMsg);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data.errors.msg);
      }
    }

    setNewMsg("");
  };

  const onEnterPressed = async (e: React.KeyboardEvent<HTMLElement>) => {
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
                <div slot="header-end">
                  {getHumanFriendlyDate(msg.updatedAt)}
                </div>
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
              onChange={e => setNewMsg((e.target as HTMLInputElement).value)}
              onKeyUp={onEnterPressed}
              placeholder="New message"
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
