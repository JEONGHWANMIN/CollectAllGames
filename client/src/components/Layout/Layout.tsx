import styled from "@emotion/styled";
import React from "react";
import { flextCenter } from "src/style/style";
import Header from "../Common/Header";

interface Props {
  children: React.ReactNode;
}
function Layout({ children }: Props) {
  return (
    <Container>
      <Header />
      <Body>{children}</Body>
    </Container>
  );
}

export default Layout;

const Container = styled.div`
  height: 100vh;
  background-color: #f4f4f4;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 95.7vh;
  width: 650px;
`;
