import styled from "@emotion/styled";
import React from "react";
import { colors } from "src/style/colors";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function SubmitButton({ name, onClick }: Props) {
  return <Button onClick={onClick}>{name}</Button>;
}

export default SubmitButton;

const Button = styled.button`
  border: none;
  width: 60%;
  height: 50px;
  color: white;
  background-color: ${colors.mainColor};
  cursor: pointer;
  border-radius: 10px;
  font-size: 16px;
  margin-top: 10px;

  :hover {
    opacity: 0.8;
  }
`;
