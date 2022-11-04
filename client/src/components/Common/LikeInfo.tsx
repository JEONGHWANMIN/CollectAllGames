import styled from "@emotion/styled";
import React from "react";
import { IoGameController, IoGameControllerOutline } from "react-icons/io5";
import useLikeMutation from "src/hooks/mutaion/useLikeMutation";
import { colors } from "src/style/colors";
import { getCookie } from "src/utils/cookie";

interface Props {
  like: boolean;
  likeCount: number;
  postId: number;
  type: "posts" | "post";
}

function LikeInfo({ like, likeCount, postId, type }: Props) {
  const { LikePost, UnLikePost } = useLikeMutation(type, postId);

  return (
    <LikeInfoBox>
      <LikeIcon>
        {like ? (
          <IoGameController
            color={colors.mainColor}
            onClick={() => {
              if (!getCookie("accessToken")) {
                return alert("로그인이 필요한 서비스입니다.");
              }
              UnLikePost(postId);
            }}
          />
        ) : (
          <IoGameControllerOutline
            color={"gray"}
            onClick={() => {
              if (!getCookie("accessToken")) {
                return alert("로그인이 필요한 서비스입니다.");
              }
              LikePost(postId);
            }}
          />
        )}
      </LikeIcon>
      <LikeCount>{likeCount}</LikeCount>
    </LikeInfoBox>
  );
}

export default LikeInfo;

const LikeInfoBox = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const LikeIcon = styled.div`
  font-size: 32px;
  cursor: pointer;
`;

const LikeCount = styled.p`
  color: gray;
  font-size: 24px;
  margin-bottom: 5px;
`;
