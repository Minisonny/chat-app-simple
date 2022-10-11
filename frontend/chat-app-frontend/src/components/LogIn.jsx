import React, { useEffect, useRef, useState } from "react";
import "./LogIn.css";
import { Card, Stack, Input, Button } from "@nordhealth/react";
import { Link } from "react-router-dom";

// helper hook for demo purposes
function useField(name, initialValue = "") {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState();
  const ref = useRef();
  const valid = Boolean(value);

  useEffect(() => {
    if (valid) {
      setError(undefined);
    }
  }, [valid]);

  return {
    setError,
    valid,
    value,
    focus: () => ref.current?.focus(),
    inputProps: {
      name,
      value,
      onInput: e => {
        const input = e.target;
        setValue(input.value);
      },
      error,
      ref
    }
  };
}

function LogIn() {
  const username = useField("username");
  const password = useField("password");

  function handleSubmit(e) {
    e.preventDefault();

    if (username.valid && password.valid) {
      alert(`User: ${username.value}\nPassword: ${password.value}`);
    }

    if (!password.valid) {
      password.setError("Please enter a password");
      password.focus();
    }

    if (!username.valid) {
      username.setError("Please enter a username");
      username.focus();
    }
  }

  return (
    <>
      <Card padding="l">
        <h2 slot="header">Sign in</h2>
        <form action="#" onSubmit={handleSubmit}>
          <Stack>
            <Input
              label="Username"
              expand
              type="email"
              placeholder="user@example.com"
              {...username.inputProps}
            ></Input>

            <div className="password">
              <Input
                label="Password"
                expand
                type="password"
                placeholder="••••••••"
                {...password.inputProps}
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
        New to Nord? <Link to="/login">Create an account</Link>.
      </Card>
    </>
  );
}

export default LogIn;
