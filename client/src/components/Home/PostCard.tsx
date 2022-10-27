import styled from "@emotion/styled";
import React from "react";
import { displayedAt } from "src/utils/convertToTIme";
import { IoGameControllerOutline, IoGameController } from "react-icons/io5";
import PostTag from "../Common/PostTag";
import { Post } from "src/types/post";
import { colors } from "src/style/colors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postService } from "src/apis/postAPI";
import { getCookie } from "src/utils/cookie";
import { useNavigate } from "react-router-dom";

const userImgSrc = "https://morethanmin-remotto.herokuapp.com/images/default-user.jpg";

interface Props {
  post: Post;
}

function PostCard({ post }: Props) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const onSuccessOption = {
    onSuccess: () => queryClient.invalidateQueries(["posts"]),
  };

  const { mutate: LikePost } = useMutation(
    (postId: number) => postService.likePost(postId),
    onSuccessOption
  );

  const { mutate: UnLikePost } = useMutation(
    (postId: number) => postService.unLikePost(postId),
    onSuccessOption
  );

  return (
    <Container>
      <UserAndLikeInfo>
        <UserInfo>
          <UserImage>
            <img src={userImgSrc} alt="userImg"></img>
          </UserImage>
          <User>
            <h1>{post.username}</h1>
            <p>{displayedAt(post.createdAt)}</p>
          </User>
        </UserInfo>
        <LikeInfo>
          <LikeIcon>
            {post.like ? (
              <IoGameController
                color={colors.mainColor}
                onClick={() => {
                  if (!getCookie("accessToken")) {
                    return alert("로그인이 필요한 서비스입니다.");
                  }
                  UnLikePost(post.id);
                }}
              />
            ) : (
              <IoGameControllerOutline
                color={"gray"}
                onClick={() => {
                  if (!getCookie("accessToken")) {
                    return alert("로그인이 필요한 서비스입니다.");
                  }
                  LikePost(post.id);
                }}
              />
            )}
          </LikeIcon>
          <LikeCount>{post.likeCount}</LikeCount>
        </LikeInfo>
      </UserAndLikeInfo>
      <PostContent onClick={() => navigate(`/detail/${post.id}`)}>
        <Thumbnail src={post.imgUrl} alt="thumbnail" />
        <PostTitle>{post.title}</PostTitle>
        <PostDescription>{post.content}</PostDescription>
      </PostContent>
      <TagBox>
        {post.tag.map((tag, index) => (
          <PostTag tag={tag} key={index} />
        ))}
      </TagBox>
      <ViewAndComment>
        <Count>조회수 {post.view}</Count>
        <Count>댓글 {post.commentCount}</Count>
      </ViewAndComment>
    </Container>
  );
}

export default PostCard;

const Container = styled.div`
  width: 100%;
  padding: 15px 20px;
  background-color: white;
  border: solid 1px lightgray;
  margin-bottom: 10px;
`;

const UserAndLikeInfo = styled.div`
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

const LikeInfo = styled.div`
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

const PostContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
  cursor: pointer;
`;

const Thumbnail = styled.img`
  width: 100%;
  border-radius: 20px;
`;

const PostTitle = styled.h1`
  font-size: 18px;
  font-weight: 700;
  line-height: 17px;
  margin-top: 10px;
`;

const PostDescription = styled.p`
  font-size: 14px;
`;

const TagBox = styled.div`
  margin-top: 10px;
  margin-left: -5px;
  display: flex;
  gap: 5px;
`;

const ViewAndComment = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;
const Count = styled.p`
  color: gray;
  font-size: 13px;
`;
