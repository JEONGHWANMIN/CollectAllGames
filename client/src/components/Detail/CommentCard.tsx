import styled from "@emotion/styled";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { Dispatch, SetStateAction, useState } from "react";
import { postService } from "src/apis/postAPI";
import { useUserState } from "src/context/userContext";
import { colors } from "src/style/colors";
import { UserState } from "src/types/user";
import { displayedAt } from "src/utils/convertToTIme";
import { Comment } from "../../types/post";

interface Props {
  comment: Comment;
}

const userImgSrc = "https://morethanmin-remotto.herokuapp.com/images/default-user.jpg";

function CommentCard({ comment }: Props) {
  const [user] = useUserState() as [UserState, Dispatch<SetStateAction<UserState>>];
  const [isEdit, setIsEdit] = useState(false);
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

  const { mutate: updateComment } = useMutation(
    (commentId: number) => postService.updateComment(commentId, { content }),
    {
      onSuccess: () => {
        setIsEdit(false);
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
              <DeleteAndRevise
                onClick={() => {
                  setIsEdit((pre) => !pre);
                }}
              >
                수정
              </DeleteAndRevise>
              <DeleteAndRevise
                onClick={() => {
                  if (window.confirm("정말 삭제하시겠습니까?")) {
                    deleteComment(comment.id);
                  }
                }}
              >
                삭제
              </DeleteAndRevise>
            </>
          )}
        </ContentEdit>
      </User>
      <Content>
        <CommentInput
          value={content}
          disabled={!isEdit}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          isEdit={isEdit}
        />
      </Content>
      {isEdit && (
        <CommentReviseBtn
          onClick={() => {
            updateComment(comment.id);
          }}
        >
          수정완료
        </CommentReviseBtn>
      )}
    </Container>
  );
}

export default CommentCard;

const Container = styled.div`
  width: 100%;
  background-color: white;
  padding: 10px;
  border: solid 1px lightgray;
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

const CommentInput = styled.input<{ isEdit: boolean }>`
  border: none;
  width: 100%;
  height: 40px;
  background-color: ${({ isEdit }) => (isEdit ? "white" : "#eeeeee")};
  border-radius: 5px;
  padding: 10px;

  :focus {
    outline: none;
    border: solid 1px ${colors.mainColor};
  }
`;

const CommentReviseBtn = styled.p`
  margin-top: 10px;
  font-size: 12px;
  margin-left: 5px;
  color: #0095f6;
  cursor: pointer;
`;
