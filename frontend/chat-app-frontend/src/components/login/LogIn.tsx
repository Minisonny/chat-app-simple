import React, { useState } from "react";
import "./LogIn.css";
import { Card, Stack, Input, Button, Banner } from "@nordhealth/react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../api/userApi";
import { NullableString, User } from "../../types/common";
import axios from "axios";

interface LogInProps {
  onSignIn: (user: User) => void;
}

function LogIn({ onSignIn }: LogInProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<NullableString>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    try {
      const user = await loginUser(username, password);
      setError(null);
      onSignIn(user);
      navigate("/thread");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data.error);
      }
    }
  };

  return (
    <>
      <Card padding="l">
        <h2 slot="header">Sign in</h2>
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

            <a href="#forgot">Forgot password?</a>
          </div>
          <Button type="submit" expand variant="primary" onClick={handleSubmit}>
            Sign in
          </Button>
        </Stack>
      </Card>

      <Card className="n-align-center">
        New to our app? <Link to="/register">Create an account</Link>.
      </Card>
    </>
  );
}

export default LogIn;
