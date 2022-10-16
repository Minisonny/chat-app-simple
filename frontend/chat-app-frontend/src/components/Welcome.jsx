import { Stack, Button, Icon } from "@nordhealth/react";
import React, { useState } from "react";
import { useNavigate } from "react-router";

const ICON_LIST = [
  "generic-feline",
  "generic-fish",
  "generic-arachnida",
  "generic-birds",
  "generic-amphibia",
  "generic-suidae"
];

const Welcome = ({ user }) => {
  const [icon, setIcon] = useState(ICON_LIST[0]);
  const navigate = useNavigate();

  const shuffleIcon = () => {
    const randomIdx = Math.floor(Math.random() * ICON_LIST.length);

    setIcon(ICON_LIST[randomIdx]);
  };

  return (
    <Stack alignItems="center" justifyContent="center">
      <h1>Welcome</h1>
      <Icon name={icon} size="xxl"></Icon>
      <p>This is a basic chat app. Meow!</p>
      <Stack justify-content="center" gap="s" direction="horizontal">
        {user ? (
          <Button variant="primary" onClick={shuffleIcon}>
            Play gacha
          </Button>
        ) : (
          <Button variant="primary" onClick={() => navigate("/login")}>
            Login
          </Button>
        )}
      </Stack>
    </Stack>
  );
};

export default Welcome;
