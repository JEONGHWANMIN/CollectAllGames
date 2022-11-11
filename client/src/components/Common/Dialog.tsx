import styled from "@emotion/styled";
import React from "react";
import { colors } from "src/style/colors";
import Modal from "./Modal";

interface Props {
  title: string;
  content: string;
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

function Dialog({ title, content, visible, onConfirm, onClose }: Props) {
  return (
    <Modal visible={visible}>
      <DiaLogBox>
        <Title>{title}</Title>
        <Content>{content}</Content>
        <ButtonBox>
          <Button color={colors.mainColor} onClick={() => onConfirm()}>
            확인
          </Button>
          <Button onClick={() => onClose()}>취소</Button>
        </ButtonBox>
      </DiaLogBox>
    </Modal>
  );
}

export default Dialog;

const DiaLogBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 24px;
`;

const Title = styled.h3`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 24px;
  margin-top: 24px;
`;

const Content = styled.p`
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 16px;
  white-space: pre-wrap;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
`;

const Button = styled.button<{ color?: string }>`
  padding: 12px 22px;
  border-radius: 4px;
  border: none;
  background-color: ${({ color }) => color ?? "#f1f3f5;"};
  color: ${({ color }) => (color ? "white" : "black")};
  font-size: 16px;
  font-weight: 700;
  margin-left: 8px;
  cursor: pointer;
`;
