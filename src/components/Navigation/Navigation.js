import React from "react";
import { Image, Menu } from "semantic-ui-react";

const Navigation = (logo, username, logout) => {
  return (
    <Menu stackable style={{ backgroundColor: "#585858" }}>
      <Menu.Item>
        <Image src={logo} style={{ height: 50 }} centered />
      </Menu.Item>
      <Menu.Item>Welcome, {username}</Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item
          style={{ backgroundColor: "red", color: "white" }}
          name="Logout"
          onClick={logout}
        />
      </Menu.Menu>
    </Menu>
  );
};

export default Navigation;
