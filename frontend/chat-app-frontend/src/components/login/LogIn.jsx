import React, { useState } from "react";
import "./LogIn.css";
import { Card, Stack, Input, Button, Banner } from "@nordhealth/react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../api/userApi";

function LogIn({ onSignIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const user = await loginUser(username, password);
      setError(null);
      onSignIn(user);
      navigate("/thread");
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  return (
    <>
      <Card padding="l">
        <h2 slot="header">Sign in</h2>
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

              <a href="#forgot">Forgot password?</a>
            </div>
            <Button type="submit" expand variant="primary">
              Sign in
            </Button>
          </Stack>
        </form>
      </Card>

      <Card className="n-align-center">
        New to our app? <Link to="/register">Create an account</Link>.
      </Card>
    </>
  );
}

export default LogIn;
