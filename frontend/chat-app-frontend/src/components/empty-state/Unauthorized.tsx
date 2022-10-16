import { EmptyState, Stack, Button } from "@nordhealth/react";
import React from "react";
import { useNavigate } from "react-router";

const UNAUTHORIZED_MESSAGE = "Please log in to view this page.";

const Unauthorized = () => {
  const navigate = useNavigate();
  return (
    <EmptyState>
      <h2>Something’s wrong</h2>
      <p>{UNAUTHORIZED_MESSAGE}</p>
      <Stack justify-content="center" gap="s" direction="horizontal">
        <Button variant="primary" onClick={() => navigate("/login")}>
          Login
        </Button>
      </Stack>
    </EmptyState>
  );
};

export const withUnauthorized = (
  node: React.ReactNode,
  authorized: boolean
): React.ReactNode => (authorized ? node : <Unauthorized></Unauthorized>);

export default Unauthorized;
