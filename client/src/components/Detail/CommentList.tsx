import styled from "@emotion/styled";
import React from "react";
import { Comment } from "../../types/post";
import CommentCard from "./CommentCard";

interface Props {
  comments: Comment[];
}

function CommentList({ comments }: Props) {
  return (
    <CommentListBox>
      {comments.map((comment) => (
        <CommentCard comment={comment} key={comment.id} />
      ))}
    </CommentListBox>
  );
}

export default CommentList;

const CommentListBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;

  :last-child {
    margin-bottom: 20px;
  }
`;
