import styled from "@emotion/styled";
import React from "react";
import { colors } from "src/style/colors";

interface Props {
  tag: string;
}

function PostTag({ tag }: Props) {
  return (
    <Container>
      <p>#{tag}</p>
    </Container>
  );
}

export default PostTag;

const Container = styled.div`
  width: fit-content;
  padding: 5px 10px;
  background-color: ${colors.mainColor};
  border-radius: 15px;
  color: white;
  white-space: nowrap;

  p {
    font-size: 12px;
  }
`;
