import styled from "@emotion/styled";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postService } from "src/apis/postAPI";
import FullLoading from "src/components/Common/FullLoading";
import LabelInput from "src/components/Common/LabelInput";
import SubmitButton from "src/components/Common/SubmitButton";
import Layout from "src/components/Layout/Layout";
import TagsBox from "src/components/Write/TagsBox";
import { colors } from "src/style/colors";
import { WriteFormType } from "src/types/form";

function Write() {
  const navigate = useNavigate();

  const [form, setForm] = useState<WriteFormType>({
    title: "",
    content: "",
    link: "",
    tags: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { title, content, link, tags } = form;

  const { mutate: createPost, isLoading } = useMutation(postService.createPost, {
    onSuccess: () => {
      alert("게시물이 등록되었습니다.");
      navigate("/");
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 404) {
        alert(error);
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { title, content, link, tags } = form;
    if (
      !title ||
      !content ||
      !link ||
      !tags.length ||
      title.trim() === "" ||
      content.trim() === "" ||
      link.trim() === ""
    ) {
      alert("모든 항목을 입력해주세요.");
      return;
    }
    createPost(form);
  };

  return (
    <Layout>
      <Container>
        <Title>공유하기</Title>
        <Form onSubmit={handleSubmit}>
          <TagsBox setForm={setForm} tags={tags} />
          <LabelInput label={"제목"} onChange={handleChange} value={title} name={"title"} />
          <TextAreaBox>
            <Label>내용</Label>
            <TextArea
              value={content}
              onChange={(e) =>
                setForm({
                  ...form,
                  content: e.target.value,
                })
              }
            ></TextArea>
          </TextAreaBox>
          <LabelInput
            label={"링크"}
            onChange={handleChange}
            value={link}
            name={"link"}
            placeholder={"https://youtu.be/4Yqqh8JjTsI"}
          />
          <ExplainBox>
            <Explain>* 유튜브 공유하기 링크를 넣어주세요 !</Explain>
          </ExplainBox>
          <SubmitButton name="완료" />
        </Form>
      </Container>
      {isLoading && <FullLoading />}
    </Layout>
  );
}

export default Write;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 150px;
  width: 100%;
  padding-bottom: 50px;
  background-color: white;
  border-radius: 10px;
`;

const Title = styled.div`
  margin-top: 20px;
  font-size: 25px;
`;

const Form = styled.form`
  margin-top: 30px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ExplainBox = styled.div`
  width: 60%;
`;

const Explain = styled.p`
  font-size: 12px;
  color: gray;
`;

const TextAreaBox = styled.div`
  width: 60%;
  margin-bottom: 10px;
`;

const Label = styled.label`
  text-align: left;
  font-size: 18px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 150px;
  border: solid 2px lightgray;
  border-radius: 5px;
  padding: 10px;
  resize: none;

  &:focus {
    outline: none;
    border-color: ${colors.mainColor};
  }
`;
