import styled from "@emotion/styled";
import { useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import useCommentMutaion from "src/hooks/mutaion/useCommentMutaion";
import { colors } from "src/style/colors";
import { getCookie } from "src/utils/cookie";

interface Props {
  postId: number;
}

function CommentInputBox({ postId }: Props) {
  const [comment, setComment] = useState("");

  const queryClient = useQueryClient();

  const createCommentSuccessOption = {
    onSuccess: () => {
      queryClient.invalidateQueries(["post", Number(postId)]);
      setComment("");
    },
  };

  const { createComment } = useCommentMutaion(createCommentSuccessOption);

  return (
    <CommnetInputContainer>
      <CommentBox>
        <CommentInput
          type={"text"}
          value={comment}
          placeholder={
            getCookie("accessToken") ? "댓글을 입력해주세요." : "로그인이 필요한 서비스입니다."
          }
          disabled={getCookie("accessToken") ? false : true}
          onChange={(e) => setComment(e.target.value)}
        />
        <CommentSubmit
          disabled={getCookie("accessToken") ? false : true}
          onClick={async (e) => {
            e.preventDefault();
            if (!getCookie("accessToken")) {
              return alert("로그인이 필요한 서비스입니다.");
            }
            if (comment.trim() === "") {
              return alert("댓글을 입력해주세요.");
            }
            createComment({ postId: Number(postId), comment });
          }}
        >
          입력
        </CommentSubmit>
      </CommentBox>
    </CommnetInputContainer>
  );
}

export default CommentInputBox;

const CommnetInputContainer = styled.div`
  width: 100%;
  padding: 15px 20px;
  background-color: white;
  border: solid 1px lightgray;
  margin-bottom: 10px;
`;

const CommentBox = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const CommentInput = styled.input`
  width: 100%;
  height: 44px;
  border: solid 2px lightgray;
  border-radius: 5px;
  padding: 10px;

  &:focus {
    outline: none;
    border-color: ${colors.mainColor};
  }

  &::placeholder {
    color: gray;
  }
`;

const CommentSubmit = styled.button`
  width: 20%;
  height: 44px;
  color: white;
  background-color: ${colors.mainColor};
  cursor: pointer;
  border-radius: 10px;
  font-size: 16px;
`;
