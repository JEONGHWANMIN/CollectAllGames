import styled from "@emotion/styled";
import React from "react";

interface Props {
  visible: boolean;
}

function OverLay({ visible }: Props) {
  return <>{visible && <Fill />}</>;
}

export default OverLay;

const Fill = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;
