import React from "react";
import { EmptyState, Stack, Button } from "@nordhealth/react";
import { useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <EmptyState>
      <h2>404 Not Found</h2>
      <p>Nothing here</p>
      <Stack justify-content="center" gap="s" direction="horizontal">
        <Button variant="primary" onClick={() => navigate("/")}>
          Home
        </Button>
      </Stack>
    </EmptyState>
  );
};

export default NotFound;
