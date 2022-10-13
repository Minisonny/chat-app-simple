import React from "react";
import { NavItem, NavGroup } from "@nordhealth/react";

const NAV_OPTION_CONFIG = [
  {
    heading: "",
    items: [
      {
        icon: "navigation-search",
        href: "#",
        text: "Search",
        additionalProps: {}
      }
    ]
  },
  {
    heading: "User",
    items: [
      {
        icon: "interface-bookmark",
        href: "/thread",
        text: "My threads",
        additionalProps: {}
      }
    ]
  },
  {
    heading: "Thread",
    items: [
      {
        icon: "text-list",
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
            <NavItem
              key={`nav-item-${group.heading}-${i}`}
              icon={item.icon}
              href={item.href}
              {...item.additionalProps}
            >
              {item.text}
            </NavItem>
          ))}
        </NavGroup>
      ))}
    </>
  );
};

export default NavOption;
