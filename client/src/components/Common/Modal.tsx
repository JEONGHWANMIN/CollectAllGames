import styled from "@emotion/styled";
import React from "react";
import OverLay from "./OverLay";

interface Props {
  children: React.ReactNode;
  visible: boolean;
}

function Modal({ children, visible }: Props) {
  return (
    <>
      <OverLay visible={visible} />
      {visible && <ModalBox>{children}</ModalBox>}
    </>
  );
}

export default Modal;

const ModalBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  background-color: white;
  width: 400px;
  border-radius: 10px;
`;
