import React, { useEffect, useState } from "react";
import { Header, Stack, Card } from "@nordhealth/react";
import { listThreads } from "../../api/threadApi";
import { useNavigate } from "react-router";
import "./ThreadView.css";

const ThreadView = () => {
  const [threads, setThreads] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    listThreads().then(setThreads).catch(Error);
  }, []);

  return (
    <>
      <Header slot="header">
        <h1 className="n-typescale-l">Thread list</h1>
      </Header>
      <Stack gap="l">
        {threads.map(thread => (
          <Card
            key={`thread-${thread.id}`}
            className="thread-card"
            onClick={() => navigate(`${thread.id}`)}
          >
            <h2 slot="header">{thread.name}</h2>
            Author id: {thread?.UserThread.userId}
          </Card>
        ))}
      </Stack>
    </>
  );
};

export default ThreadView;
