import React from "react";
import "@nordhealth/css";
import { Navigation } from "@nordhealth/react";
import NavOption from "./NavOptions";
import AccountToolbar from "./AccountToolbar";

const NavigationPanel = ({ user, onSignOut }) => {
  return (
    <Navigation slot="nav">
      <AccountToolbar user={user} onSignOut={onSignOut}></AccountToolbar>
      <NavOption></NavOption>
    </Navigation>
  );
};

export default NavigationPanel;
