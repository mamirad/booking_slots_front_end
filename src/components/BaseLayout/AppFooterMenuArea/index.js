/* 
  Footer Menus for application
*/

import React from "react";

import { NavLink } from "react-router-dom";

import { Menu } from "antd";

// Localization
import LOCALIZATION from "services/LocalizationService";

// Style
import './style.scss'

// Helpers
function AppMenuArea() {
  return (
    <Menu mode="inline">
      <Menu.Item key={"1"} icon={<i className={"icon-Pricing-Icon-White"}></i>}>
        <NavLink to={"#"}>{LOCALIZATION.PRICING}</NavLink>
      </Menu.Item>
      <Menu.Item key={"2"} icon={<i className={"icon-Help-Icon-White"}></i>}>
        <a href="https://hiremii.com/help" rel="noreferrer" target="_blank"> {LOCALIZATION.HELP} </a>
      </Menu.Item>

      <Menu.Item
        key={"3"}
        icon={<i className={"icon-Feedback-Icon-White"}></i>}
      >
        <a href={"https://hiremii.com/feedback/" } rel="noreferrer" target="_blank" >{LOCALIZATION.FEEDBACK}</a>
      </Menu.Item>
    </Menu>
  );
}

export default AppMenuArea;
