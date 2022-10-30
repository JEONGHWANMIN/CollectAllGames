import styled from "@emotion/styled";
import React from "react";
import { useState } from "react";
import { colors } from "src/style/colors";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  errorMessages?: string;
  value: string;
}

function LabelInput({
  label,
  type,
  onChange,
  name,
  error,
  errorMessages,
  value,
  placeholder,
}: Props) {
  const [focus, setFocus] = useState(false);
  const handleBlur = () => {
    setFocus(false);
  };
  const handleFocus = () => {
    setFocus(true);
  };
  return (
    <Container>
      <Label focus={focus}>{label}</Label>
      <Input
        name={name}
        type={type}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onChange={onChange}
        placeholder={placeholder}
      />
      {error && value.length >= 1 ? <Error>{errorMessages}</Error> : <Error></Error>}
    </Container>
  );
}

export default LabelInput;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
`;

const Label = styled.label<{ focus: boolean }>`
  font-size: 18px;
  ${({ focus }) => focus && `color: ${colors.mainColor}`}
`;

const Input = styled.input`
  width: 100%;
  height: 44px;
  border: solid 2px lightgray;
  border-radius: 5px;
  padding: 10px;

  &:focus {
    outline: none;
    border-color: ${colors.mainColor};
  }
`;

const Error = styled.div`
  color: red;
  font-size: 12px;
  height: 15px;
`;
