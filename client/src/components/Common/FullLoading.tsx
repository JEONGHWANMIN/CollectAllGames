import styled from "@emotion/styled";
import React from "react";
import LoadingSpinner from "./LoadingSpinner";

function FullLoading() {
  return (
    <Container>
      <LoadingSpinner />
    </Container>
  );
}

export default FullLoading;

const Container = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
`;
