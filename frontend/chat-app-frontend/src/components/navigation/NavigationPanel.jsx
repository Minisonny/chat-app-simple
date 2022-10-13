import React from "react";
import "@nordhealth/css";
import { Navigation } from "@nordhealth/react";
import NavOption from "./NavOptions";
import AccountToolbar from "./AccountToolbar";

const NavigationPanel = () => {
  return (
    <Navigation slot="nav">
      <AccountToolbar></AccountToolbar>
      <NavOption></NavOption>
    </Navigation>
  );
};

export default NavigationPanel;
