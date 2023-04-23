import React from "react";
import { Container, Image } from "semantic-ui-react";

const Header = () => {
  return (
    <Container style={{ backgroundColor: "#585858" }}>
      <Image src="images/logo.svg" style={{ height: 100 }} centered />
    </Container>
  );
};

export default Header;
