import styled from "@emotion/styled";
import React, { Dispatch, SetStateAction } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TagList from "src/components/Common/TagList";
import UserAndLikeInfo from "src/components/Common/UserAndLikeInfo";
import CommentInputBox from "src/components/Detail/CommentInputBox";
import CommentList from "src/components/Detail/CommentList";
import Layout from "src/components/Layout/Layout";
import { useUserState } from "src/context/userContext";
import usePostMutation from "src/hooks/mutaion/usePostDeleteMutation";
import useGetPostQuery from "src/hooks/query/useGetPostQuery";
import { UserState } from "src/types/user";

function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user] = useUserState() as [UserState, Dispatch<SetStateAction<UserState>>];

  const { data: post, isLoading } = useGetPostQuery(Number(id));

  const deletePostSuccessOption = {
    onSuccess: () => {
      navigate("/");
    },
  };

  const { mutate: deletePost } = usePostMutation(deletePostSuccessOption);

  if (isLoading) return <div>로딩중</div>;
  if (!post) return <div>존재하지 않는 게시물입니다.</div>;

  return (
    <Layout>
      <CardContainer>
        <UserAndLikeInfo post={post} type="post" />
        {post.userId === user.userId && (
          <DeletePost
            onClick={() => {
              if (window.confirm("정말 삭제하시겠습니까?")) {
                deletePost(post.id);
              }
            }}
          >
            삭제
          </DeletePost>
        )}
        <Content>
          <PostTitle>{post.title}</PostTitle>
          <PostContent>{post.content}</PostContent>
          <iframe
            allowFullScreen
            src={post.videoUrl}
            frameBorder="0"
            title="dsads"
            width={`100%`}
            height={340}
          ></iframe>
          <VideoContent>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/2560px-YouTube_full-color_icon_%282017%29.svg.png"
              alt="youtubeLogo"
            />
            <OgTitle>{post.ogTitle}</OgTitle>
          </VideoContent>
        </Content>
        <TagList tags={post.tag} />
        <ViewAndComment>
          <Count>조회수 {post.view}</Count>
          <Count>댓글 {post.commentCount}</Count>
        </ViewAndComment>
      </CardContainer>
      <CommentInputBox postId={post.id} />
      <CommentList comments={post.comment} />
    </Layout>
  );
}

export default Detail;

const CardContainer = styled.div`
  width: 100%;
  padding: 15px 20px;
  background-color: white;
  border: solid 1px lightgray;
  margin-bottom: 10px;
`;

const DeletePost = styled.p`
  font-size: 12px;
  color: gray;
  cursor: pointer;
  margin: 10px 0;
  width: fit-content;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const PostTitle = styled.h1`
  font-size: 20px;
`;
const PostContent = styled.p`
  font-size: 15px;
  margin-bottom: 10px;
  white-space: pre-line;
`;

const VideoContent = styled.div`
  display: flex;
  gap: 10px;

  img {
    width: 40px;
    height: 25px;
  }
`;
const OgTitle = styled.h1`
  font-size: 18px;
  font-weight: bold;
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
