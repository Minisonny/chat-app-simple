import React from "react";
import {
  Dropdown,
  DropdownItem,
  Button,
  Avatar,
  Icon
} from "@nordhealth/react";
import "./AccountToolbar.css";
import { useNavigate } from "react-router-dom";
import { Nullable, User } from "../../types/common";

interface SignedInHeaderProps {
  username: string;
  onSignOut: () => void;
}

const SignedInHeader = ({ username, onSignOut }: SignedInHeaderProps) => (
  <>
    <Dropdown expand slot="header">
      <Button className="account-button" slot="toggle" expand variant="plain">
        <Avatar
          aria-hidden="true"
          name="Laura Williams"
          slot="start"
          size="l"
        ></Avatar>
        <Icon slot="end" name="interface-dropdown-small" size="s"></Icon>
        {username}
      </Button>
      <DropdownItem onClick={onSignOut}>
        Sign out
        <Icon slot="end" name="interface-logout" size="s"></Icon>
      </DropdownItem>
    </Dropdown>
  </>
);

const SignedOutHeader = () => {
  const navigate = useNavigate();

  return (
    <Button
      className="account-button-login"
      slot="header"
      expand
      variant="plain"
      onClick={() => navigate("/login")}
    >
      <Icon slot="start" name="user-single" size="m"></Icon>
      Sign in
    </Button>
  );
};

interface AccountToolbarProps {
  user: Nullable<User>;
  onSignOut: () => void;
}

const AccountToolbar = ({ user, onSignOut }: AccountToolbarProps) => {
  return user ? (
    <SignedInHeader username={user.username} onSignOut={onSignOut} />
  ) : (
    <SignedOutHeader />
  );
};

export default AccountToolbar;
