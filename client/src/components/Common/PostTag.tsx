import styled from "@emotion/styled";
import React from "react";
import { colors } from "src/style/colors";

function PostTag() {
  return (
    <Container>
      <p>#최신뉴스</p>
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

  p {
    font-size: 12px;
  }
`;
