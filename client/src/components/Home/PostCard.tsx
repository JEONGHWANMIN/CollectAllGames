import styled from "@emotion/styled";
import React from "react";
import { displayedAt } from "src/utils/convertToTIme";
import { IoGameControllerOutline } from "react-icons/io5";
import PostTag from "../Common/PostTag";
const userImgSrc =
  "https://morethanmin-remotto.herokuapp.com/images/default-user.jpg";

function PostCard() {
  return (
    <Container>
      <UserAndLikeInfo>
        <UserInfo>
          <UserImage>
            <img src={userImgSrc} alt="userImg"></img>
          </UserImage>
          <User>
            <h1>김떵깨</h1>
            <p>{displayedAt("2022-10-21T12:05:19.895Z")}</p>
          </User>
        </UserInfo>
        <LikeInfo>
          <LikeIcon>
            <IoGameControllerOutline color={"gray"} />
          </LikeIcon>
          <LikeCount>0</LikeCount>
        </LikeInfo>
      </UserAndLikeInfo>
      <PostContent>
        <Thumbnail
          src="https://i.ytimg.com/vi/tvvaIGNqRyc/maxresdefault.jpg"
          alt="thumbnail"
        />
        <PostTitle>카트라이더 러쉬 복귀 이벤트 진행중 😃</PostTitle>
        <PostDescription>
          카드라이더 러쉬가 복귀 이벤트를 진행한다고 합니다 !! 지금이 복귀하기{" "}
          <br />
          좋은 타이밍 인거 같습니다.
        </PostDescription>
        <TagBox>
          <PostTag />
          <PostTag />
        </TagBox>
        <ViewAndComment>
          <Count>조회수 0</Count>
          <Count>댓글 0</Count>
        </ViewAndComment>
      </PostContent>
    </Container>
  );
}

export default PostCard;

const Container = styled.div`
  width: 100%;
  padding: 15px 20px;
  background-color: white;
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
  display: flex;
  gap: 5px;
`;

const ViewAndComment = styled.div`
  display: flex;
  gap: 10px;
`;
const Count = styled.p`
  color: gray;
  font-size: 13px;
`;
