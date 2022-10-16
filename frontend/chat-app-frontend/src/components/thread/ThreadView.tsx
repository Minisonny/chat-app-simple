import React, { useContext, useEffect, useState } from "react";
import { Header, Stack, Card, Button, Icon } from "@nordhealth/react";
import { listThreads } from "../../api/threadApi";
import { useNavigate } from "react-router";
import "./ThreadView.css";
import { getUsernameFromId } from "../../utils/helpers";
import { withUnauthorized } from "../empty-state/Unauthorized";
import { Thread } from "../../types/common";

const ThreadView = ({ authorized, userList }) => {
  const [threads, setThreads] = useState<Array<Thread>>([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (authorized) {
      listThreads().then(setThreads).catch(Error);
    } else {
      setThreads([]);
    }
  }, [authorized]);

  return (
    <>
      <Header slot="header">
        <h1 className="n-typescale-l">Thread list</h1>
        {authorized && (
          <Button
            variant="primary"
            slot="end"
            onClick={() => navigate("/thread-create")}
          >
            <Icon slot="start" size="s" name="interface-add-small"></Icon>
            Create thread
          </Button>
        )}
      </Header>
      {withUnauthorized(
        <Stack gap="l">
          {threads.map(thread => (
            <Card
              key={`thread-${thread.id}`}
              className="thread-card"
              onClick={() => navigate(`${thread.id}`)}
            >
              <h2 slot="header">{thread.name}</h2>
              Author: {getUsernameFromId(userList, thread?.UserThread?.userId)}
            </Card>
          ))}
        </Stack>,
        authorized
      )}
    </>
  );
};

export default ThreadView;
