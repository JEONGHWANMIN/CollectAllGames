import styled from "@emotion/styled";
import React from "react";
import { Post } from "src/types/post";
import { displayedAt } from "src/utils/convertToTIme";
import LikeInfo from "./LikeInfo";
import userImgSrc from "src/assets/img/user-default-img.jpg";

interface Props {
  post: Post;
  type: "posts" | "post";
}

function UserAndLikeInfo({ post, type }: Props) {
  return (
    <UserAndLikeInfoBox>
      <UserInfo>
        <UserImage>
          <img src={userImgSrc} alt="userImg"></img>
        </UserImage>
        <User>
          <h1>{post.username}</h1>
          <p>{displayedAt(post.createdAt)}</p>
        </User>
      </UserInfo>
      <LikeInfo like={post.like} likeCount={post.likeCount} postId={post.id} type={type} />
    </UserAndLikeInfoBox>
  );
}

export default UserAndLikeInfo;

const UserAndLikeInfoBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const UserImage = styled.div`
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: solid 1px lightgray;
  }
`;

const User = styled.div`
  display: flex;
  flex-direction: column;
  h1 {
    font-size: 15px;
    font-weight: 600;
  }

  p {
    font-size: 12px;
    color: gray;
  }
`;
