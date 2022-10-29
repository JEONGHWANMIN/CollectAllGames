import styled from "@emotion/styled";
import React from "react";
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
  background-color: #f4f4f4;
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 600px;

  @media (max-width: 600px) {
    width: 100%;
  }
`;
