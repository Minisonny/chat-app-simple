import React from "react";
import { NavItem, NavGroup } from "@nordhealth/react";
import { Link } from "react-router-dom";

const NAV_OPTION_CONFIG = [
  {
    heading: "",
    items: [
      {
        icon: "interface-home",
        href: "/",
        text: "Home",
        additionalProps: {}
      }
    ]
  },
  {
    heading: "Thread",
    items: [
      {
        icon: "interface-chat",
        href: "/thread",
        text: "View threads",
        additionalProps: {}
      },
      {
        icon: "interface-add",
        href: "/thread-create",
        text: "Create new threads",
        additionalProps: {}
      }
    ]
  }
];

const NavOption = () => {
  return (
    <>
      {NAV_OPTION_CONFIG.map(group => (
        <NavGroup key={`nav-group-${group.heading}`} heading={group.heading}>
          {group.items.map((item, i) => (
            <Link
              key={`nav-link-${i}`}
              to={item.href}
              style={{ textDecoration: "none" }}
            >
              <NavItem
                key={`nav-item-${group.heading}-${i}`}
                icon={item.icon}
                {...item.additionalProps}
              >
                {item.text}
              </NavItem>
            </Link>
          ))}
        </NavGroup>
      ))}
    </>
  );
};

export default NavOption;
