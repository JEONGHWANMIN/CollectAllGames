import styled from "@emotion/styled";
import React from "react";
import PostTag from "./PostTag";

interface Props {
  tags: string[];
}

function TagList({ tags }: Props) {
  return (
    <TagBox>
      {tags.map((tag, index) => (
        <PostTag tag={tag} key={index} />
      ))}
    </TagBox>
  );
}

export default TagList;

const TagBox = styled.div`
  margin-top: 25px;
  margin-left: -5px;
  display: flex;
  gap: 5px;
`;
