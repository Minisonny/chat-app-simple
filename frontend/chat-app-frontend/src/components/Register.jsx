import React, { useState } from "react";
import "./LogIn.css";
import { Card, Stack, Input, Button, Banner } from "@nordhealth/react";
import { Link } from "react-router-dom";
import { registerUser } from "../api/userApi";

function LogIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();

    if (password !== confirmPassword) {
      // even though backend can validate this but it's better to do it on the client
      setError("Confirm password does not match!");
      return;
    }

    try {
      await registerUser(username, password, confirmPassword);
      setError(null);
    } catch (err) {
      setError(err.response.data.errors[0]?.msg);
    }
  };

  return (
    <>
      <Card padding="l">
        <h2 slot="header">Register</h2>
        <form onSubmit={handleSubmit}>
          <Stack>
            {error && <Banner variant="danger">{error}</Banner>}
            <Input
              id="username-input"
              label="Username"
              expand
              type="email"
              placeholder="user@example.com"
              required
              value={username}
              onChange={e => setUsername(e.target.value)}
            ></Input>
            <div className="password">
              <Input
                id="password-input"
                label="Password"
                expand
                type="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
              ></Input>
            </div>
            <div className="password">
              <Input
                id="password-confirm-input"
                label="Confirm password"
                expand
                type="password"
                placeholder="••••••••"
                required
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              ></Input>
            </div>
            <Button type="submit" expand variant="primary">
              Sign up
            </Button>
          </Stack>
        </form>
      </Card>

      <Card className="n-align-center">
        Already registered? <Link to="/login">Log in</Link>.
      </Card>
    </>
  );
}

export default LogIn;
