import styled from "@emotion/styled";
import React from "react";
import { IoGameController, IoGameControllerOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useDialog } from "src/context/dialogContext";
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
  const navigate = useNavigate();
  const { LikePost, UnLikePost } = useLikeMutation(type, postId);
  const { open } = useDialog();
  return (
    <LikeInfoBox>
      <LikeIcon>
        {like ? (
          <IoGameController
            color={colors.mainColor}
            onClick={() => {
              if (!getCookie("accessToken")) {
                open({
                  title: "로그인이 필요한 서비스입니다.",
                  content: "로그인 페이지로 이동하시겠습니까?",
                  onConfirm: () => navigate("/login"),
                  onClose: () => {},
                });
                return;
              }
              UnLikePost(postId);
            }}
          />
        ) : (
          <IoGameControllerOutline
            color={"gray"}
            onClick={() => {
              if (!getCookie("accessToken")) {
                open({
                  title: "로그인이 필요한 서비스입니다.",
                  content: "로그인 페이지로 이동하시겠습니까?",
                  onConfirm: () => navigate("/login"),
                  onClose: () => {},
                });
                return;
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
