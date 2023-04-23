import React from "react";
import { Container, Image } from "semantic-ui-react";
import logo from "../../images/logo.svg";

const Header = () => {
  return (
    <Container style={{ backgroundColor: "#585858" }}>
      <Image src={logo} style={{ height: 100 }} centered />
    </Container>
  );
};

export default Header;
