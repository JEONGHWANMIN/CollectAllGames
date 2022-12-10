import styled from "@emotion/styled";
import { useParams } from "react-router-dom";
import LoadingSpinner from "src/components/Common/LoadingSpinner";
import TagList from "src/components/Common/TagList";
import UserAndLikeInfo from "src/components/Common/UserAndLikeInfo";
import CommentInputBox from "src/components/Detail/CommentInputBox";
import CommentList from "src/components/Detail/CommentList";
import DetailAuthButton from "src/components/Detail/DetailAuthButton";
import Layout from "src/components/Layout/Layout";
import useGetPostQuery from "src/hooks/query/useGetPostQuery";

function Detail() {
  const { id } = useParams();
  const { data: post, isLoading } = useGetPostQuery(Number(id));

  if (isLoading) return <LoadingSpinner />;

  if (!post) return <div>존재하지 않는 게시물입니다.</div>;

  return (
    <Layout>
      <CardContainer>
        <UserAndLikeInfo post={post} type="post" />
        <DetailAuthButton postId={post.id} userId={post.userId} />
        <Content>
          <PostTitle>{post.title}</PostTitle>
          <PostContent>{post.content}</PostContent>
          <iframe
            allowFullScreen
            src={post.videoUrl}
            frameBorder="0"
            title="youtube"
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
