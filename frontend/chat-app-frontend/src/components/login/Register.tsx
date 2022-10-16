import React, { useState } from "react";
import "./LogIn.css";
import { Card, Stack, Input, Button, Banner } from "@nordhealth/react";
import { Link } from "react-router-dom";
import { registerUser } from "../../api/userApi";
import { NullableString } from "../../types/common";
import axios from "axios";

interface RegisterProps {
  onRegister: (username: string) => void;
}

function Register({ onRegister }: RegisterProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<NullableString>(null);

  const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      // even though backend can validate this but it's better to do it on the client
      setError("Confirm password does not match!");
      return;
    }

    try {
      await registerUser(username, password, confirmPassword);
      setError(null);
      onRegister(username);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const { msg } = err.response?.data.errors[0] || {};
        setError(msg);
      }
    }
  };

  return (
    <>
      <Card padding="l">
        <h2 slot="header">Register</h2>
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
            onChange={e => setUsername((e.target as HTMLInputElement).value)}
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
              onChange={e => setPassword((e.target as HTMLInputElement).value)}
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
              onChange={e =>
                setConfirmPassword((e.target as HTMLInputElement).value)
              }
            ></Input>
          </div>
          <Button type="submit" expand variant="primary" onClick={handleSubmit}>
            Sign up
          </Button>
        </Stack>
      </Card>

      <Card className="n-align-center">
        Already registered? <Link to="/login">Log in</Link>.
      </Card>
    </>
  );
}

export default Register;
