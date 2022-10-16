import React from "react";
import "@nordhealth/css";
import { Navigation } from "@nordhealth/react";
import NavOption from "./NavOptions";
import AccountToolbar from "./AccountToolbar";
import { Nullable, User } from "../../types/common";

interface NavigationPanelProps {
  user: Nullable<User>;
  onSignOut: () => void;
}

const NavigationPanel = ({ user, onSignOut }: NavigationPanelProps) => {
  return (
    <Navigation slot="nav">
      <AccountToolbar user={user} onSignOut={onSignOut}></AccountToolbar>
      <NavOption></NavOption>
    </Navigation>
  );
};

export default NavigationPanel;
