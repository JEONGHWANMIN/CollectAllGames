import styled from "@emotion/styled";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { Dispatch, SetStateAction, useState } from "react";
import { postService } from "src/apis/postAPI";
import { useUserState } from "src/context/userContext";
import { UserState } from "src/types/user";
import { displayedAt } from "src/utils/convertToTIme";
import { Comment } from "../../types/post";

interface Props {
  comment: Comment;
}

const userImgSrc = "https://morethanmin-remotto.herokuapp.com/images/default-user.jpg";

function CommentCard({ comment }: Props) {
  const [user] = useUserState() as [UserState, Dispatch<SetStateAction<UserState>>];
  const [content, setContent] = useState(comment.content);
  const queryClient = useQueryClient();
  const { mutate: deleteComment } = useMutation(
    (commentId: number) => postService.deleteComment(commentId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts", comment.postId]);
      },
    }
  );

  return (
    <Container>
      <User>
        <UserInfo>
          <UserImage>
            <img src={userImgSrc} alt="userImg" />
          </UserImage>
          <Info>
            <UserName>{comment.username}</UserName>
            <CreatedAt>{displayedAt(comment.createdAt)}</CreatedAt>
          </Info>
        </UserInfo>
        <ContentEdit>
          {user.userId === comment.userId && (
            <>
              <DeleteAndRevise>수정</DeleteAndRevise>
              <DeleteAndRevise
                onClick={() => {
                  deleteComment(comment.id);
                }}
              >
                삭제
              </DeleteAndRevise>
            </>
          )}
        </ContentEdit>
      </User>
      <Content>
        <CommentInput value={content} disabled={true}></CommentInput>
      </Content>
    </Container>
  );
}

export default CommentCard;

const Container = styled.div`
  width: 100%;
  background-color: white;
  padding: 10px;
`;

const User = styled.div`
  display: flex;
  justify-content: space-between;
`;

const UserImage = styled.div`
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: solid 1px lightgray;
  }
`;

const UserInfo = styled.div`
  display: flex;
  gap: 10px;
`;

const Info = styled.div``;

const UserName = styled.h2`
  font-size: 16px;
  font-weight: 600;
`;

const CreatedAt = styled.p`
  font-size: 12px;
  color: gray;
`;

const ContentEdit = styled.div`
  display: flex;
  gap: 5px;
  margin-right: 10px;
`;

const DeleteAndRevise = styled.p`
  font-size: 12px;
  color: gray;
  cursor: pointer;
`;

const Content = styled.div`
  margin-top: 10px;
  padding: 10px;
  background-color: #eeeeee;
  border-radius: 10px;
`;

const CommentInput = styled.input`
  background-color: #eeeeee;
  border: none;
  width: 100%;
  height: 30px;
`;
