import styled from "@emotion/styled";
import React from "react";
import { colors } from "src/style/colors";

interface Props {
  name: string;
}

function SubmitButton({ name }: Props) {
  return <Button>{name}</Button>;
}

export default SubmitButton;

const Button = styled.button`
  width: 60%;
  height: 50px;
  color: white;
  background-color: ${colors.mainColor};
  cursor: pointer;
  border-radius: 10px;
  font-size: 16px;
`;
