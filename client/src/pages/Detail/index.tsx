import styled from "@emotion/styled";
import { useQueryClient } from "@tanstack/react-query";
import React, { Dispatch, SetStateAction, useState } from "react";
import { IoGameController, IoGameControllerOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import PostTag from "src/components/Common/PostTag";
import CommentCard from "src/components/Detail/CommentCard";
import Layout from "src/components/Layout/Layout";
import { useUserState } from "src/context/userContext";
import useCommentMutaion from "src/hooks/mutaion/useCommentMutaion";
import useLikeMutaion from "src/hooks/mutaion/useLikeMutation";
import usePostMutation from "src/hooks/mutaion/usePostDeleteMutation";
import useGetPostQuery from "src/hooks/query/useGetPostQuery";
import { colors } from "src/style/colors";
import { UserState } from "src/types/user";
import { displayedAt } from "src/utils/convertToTIme";
import { getCookie } from "src/utils/cookie";

const userImgSrc = "https://morethanmin-remotto.herokuapp.com/images/default-user.jpg";

function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user] = useUserState() as [UserState, Dispatch<SetStateAction<UserState>>];
  const [comment, setComment] = useState("");

  const { data: post, isLoading } = useGetPostQuery(Number(id));

  const queryClient = useQueryClient();

  const LikeSuccessOption = {
    onSuccess: () => queryClient.invalidateQueries(["post", Number(id)]),
  };

  const createCommentSuccessOption = {
    onSuccess: () => {
      queryClient.invalidateQueries(["post", Number(id)]);
      setComment("");
    },
  };

  const deletePostSuccessOption = {
    onSuccess: () => {
      navigate("/");
    },
  };

  const { mutate: deletePost } = usePostMutation(deletePostSuccessOption);
  const { LikePost, UnLikePost } = useLikeMutaion(LikeSuccessOption);
  const { createComment } = useCommentMutaion(createCommentSuccessOption);

  if (isLoading) return <div>로딩중</div>;
  if (!post) return <div>존재하지 않는 게시물입니다.</div>;

  return (
    <Layout>
      <CardContainer>
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
        {post.userId === user.userId && (
          <>
            <DeletePost
              onClick={() => {
                if (window.confirm("정말 삭제하시겠습니까?")) {
                  deletePost(post.id);
                }
              }}
            >
              삭제
            </DeletePost>
          </>
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
        <TagBox>
          {post.tag.map((tag, index) => (
            <PostTag tag={tag} key={index} />
          ))}
        </TagBox>
        <ViewAndComment>
          <Count>조회수 {post.view}</Count>
          <Count>댓글 {post.commentCount}</Count>
        </ViewAndComment>
      </CardContainer>
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
              createComment({ postId: Number(post.id), comment });
            }}
          >
            입력
          </CommentSubmit>
        </CommentBox>
      </CommnetInputContainer>
      <CommentList>
        {post.comment.map((comment) => (
          <CommentCard comment={comment} key={comment.id} />
        ))}
      </CommentList>
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

const TagBox = styled.div`
  margin-top: 25px;
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

const CommentList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;

  :last-child {
    margin-bottom: 20px;
  }
`;
