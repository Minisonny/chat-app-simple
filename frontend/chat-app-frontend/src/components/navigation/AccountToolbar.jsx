import React from "react";
import {
  Dropdown,
  DropdownItem,
  Button,
  Avatar,
  Icon
} from "@nordhealth/react";
import "./AccountToolbar.css";

const AccountToolbar = () => {
  return (
    <>
      <Dropdown expand slot="header">
        <Button class="account-button" slot="toggle" expand variant="plain">
          <Avatar
            aria-hidden="true"
            name="Laura Williams"
            slot="start"
          ></Avatar>
          <Icon slot="end" name="interface-dropdown-small" size="s"></Icon>
          Laura Williams
        </Button>
        <DropdownItem>
          Sign out
          <Icon slot="end" name="interface-logout" size="s"></Icon>
        </DropdownItem>
      </Dropdown>
    </>
  );
};

export default AccountToolbar;
