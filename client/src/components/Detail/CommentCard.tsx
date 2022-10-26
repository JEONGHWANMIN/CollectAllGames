import styled from "@emotion/styled";
import React from "react";
import { Comment } from "../../types/post";
interface Props {
  comment: Comment;
}

function CommentCard({ comment }: Props) {
  return <Container>CommentCard</Container>;
}

export default CommentCard;

const Container = styled.div`
  width: 100%;
  background-color: white;
`;
