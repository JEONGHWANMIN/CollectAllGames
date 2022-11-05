import styled from "@emotion/styled";
import React, { Dispatch, SetStateAction } from "react";
import { useUserState } from "src/context/userContext";
import { UserState } from "src/types/user";
import usePostMutation from "src/hooks/mutaion/usePostDeleteMutation";

interface Props {
  postId: number;
  userId: number;
}

function DetailAuthButton({ postId, userId }: Props) {
  const [user] = useUserState() as [UserState, Dispatch<SetStateAction<UserState>>];

  const { mutate: deletePost } = usePostMutation();

  if (user.userId !== userId) return null;
  return (
    <div>
      <DeletePost
        onClick={() => {
          if (window.confirm("정말 삭제하시겠습니까?")) {
            deletePost(postId);
          }
        }}
      >
        삭제
      </DeletePost>
    </div>
  );
}

export default DetailAuthButton;

const DeletePost = styled.p`
  font-size: 12px;
  color: gray;
  cursor: pointer;
  margin: 10px 0;
  width: fit-content;
`;
