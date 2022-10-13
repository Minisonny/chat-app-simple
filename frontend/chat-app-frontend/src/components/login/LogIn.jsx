import React, { useState } from "react";
import "./LogIn.css";
import {
  Card,
  Stack,
  Input,
  Button,
  Banner,
  ToastGroup,
  Toast
} from "@nordhealth/react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../api/userApi";

function LogIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      await loginUser(username, password);
      setError(null);
      setToast("Logged in successfully");
      navigate("/thread");
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  const onToastDismiss = () => {
    setToast(null);
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

      <ToastGroup>
        {toast !== null && (
          <Toast autoDismiss={2000} onDismiss={onToastDismiss}>
            {toast}
          </Toast>
        )}
      </ToastGroup>
    </>
  );
}

export default LogIn;
