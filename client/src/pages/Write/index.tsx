import styled from "@emotion/styled";
import React from "react";
import LabelInput from "src/components/Common/LabelInput";
import SubmitButton from "src/components/Common/SubmitButton";
import Layout from "src/components/Layout/Layout";
import { colors } from "src/style/colors";

function Write() {
  const [form, setForm] = React.useState({
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(form);
  };
  return (
    <Layout>
      <Container>
        <Title>공유하기</Title>
        <Form onSubmit={handleSubmit}>
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
          <LabelInput label={"링크"} onChange={handleChange} value={link} name={"link"} />
          <SubmitButton name="완료" />
          ㅇㅇ
        </Form>
      </Container>
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
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
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
