import styled from "@emotion/styled";
import React, { useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { WriteFormType } from "src/types/form";
import PostTag from "../Common/PostTag";

interface Props {
  tags: string[];
  setForm: React.Dispatch<React.SetStateAction<WriteFormType>>;
}

const Tags = ["최신게임", "업데이트", "복귀이벤트", "모바일게임", "PC게임"];

function TagsBox({ tags, setForm }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleAddTag = (tag: string) => {
    if (tags.includes(tag)) {
      alert("이미 존재하는 태그입니다.");
      return;
    }

    if (tags.length >= 3) {
      alert("태그는 최대 3개까지만 등록할 수 있습니다.");
      return;
    }

    setForm((prev) => ({
      ...prev,
      tags: [...prev.tags, tag],
    }));
  };

  const handleRemoveTag = (tag: string) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  return (
    <TagBox>
      <Label>태그</Label>
      <TagOptions onClick={() => setIsOpen((pre) => !pre)}>
        <p>태그를 선택해주세요 (최대 3개)</p>
        <AiFillCaretDown />
      </TagOptions>
      {isOpen && (
        <TagList>
          {Tags.map((tag) => (
            <TagItem key={tag} onClick={() => handleAddTag(tag)}>
              {tag}
            </TagItem>
          ))}
        </TagList>
      )}
      <ViewTags>
        {tags.map((tag) => (
          <div onClick={() => handleRemoveTag(tag)}>
            <PostTag key={tag} tag={tag} />
          </div>
        ))}
      </ViewTags>
    </TagBox>
  );
}

export default TagsBox;

const TagBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 60%;
  margin-bottom: 15px;
`;

const TagOptions = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 44px;
  border: solid 2px lightgray;
  border-radius: 5px;
  padding: 10px;
  color: gray;
  cursor: pointer;

  p {
    font-size: 14px;
  }
`;

const Label = styled.label`
  text-align: left;
  font-size: 18px;
`;

const TagList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  position: absolute;
  width: 100%;
  bottom: -260px;
  background-color: white;
  border: solid 1px lightgray;
  border-radius: 5px;
  padding: 5px;
`;

const TagItem = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 44px;
  border: solid 2px lightgray;
  border-radius: 5px;
  padding: 10px;
  resize: none;
  color: gray;
  cursor: pointer;
  background-color: white;
  font-size: 14px;

  &:hover {
    background-color: lightgray;
  }
`;

const ViewTags = styled.div`
  margin-top: 10px;
  display: flex;
  gap: 5px;
`;
