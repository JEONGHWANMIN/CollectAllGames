import styled from "@emotion/styled";
import React from "react";
import { Post } from "src/types/post";
import { useNavigate } from "react-router-dom";
import UserAndLikeInfo from "../Common/UserAndLikeInfo";
import TagList from "../Common/TagList";

interface Props {
  post: Post;
}

function PostCard({ post }: Props) {
  const navigate = useNavigate();

  return (
    <Container>
      <UserAndLikeInfo post={post} type="posts" />
      <PostContent onClick={() => navigate(`/detail/${post.id}`)}>
        <Thumbnail src={post.imgUrl} alt="thumbnail" />
        <PostTitle>{post.title}</PostTitle>
        <PostDescription>{post.content}</PostDescription>
      </PostContent>
      <TagList tags={post.tag} />
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
  white-space: pre-line;
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
