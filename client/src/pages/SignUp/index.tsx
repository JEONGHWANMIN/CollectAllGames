import styled from "@emotion/styled";
import React from "react";
import LabelInput from "src/components/LabelInput/LabelInput";
import Layout from "src/components/Layout/Layout";
import SubmitButton from "src/components/SubmitButton/SubmitButton";
import useForm from "src/hooks/useForm";

interface FormType {
  email: string;
  username: string;
  password: string;
  passwordConfirm: string;
}

function SignUp() {
  const { formData, handleChange, handleSubmit } = useForm<FormType>({
    email: "",
    username: "",
    password: "",
    passwordConfirm: "",
  });

  const { email, username, password, passwordConfirm } = formData;

  return (
    <Layout>
      <Container onSubmit={handleSubmit}>
        <Title>회원가입</Title>
        <Form>
          <LabelInput
            label="이메일"
            name="email"
            value={email}
            onChange={handleChange}
          />
          <LabelInput
            label="이름"
            name="username"
            value={username}
            onChange={handleChange}
          />
          <LabelInput
            label="비밀번호"
            name="password"
            value={password}
            onChange={handleChange}
          />
          <LabelInput
            label="비밀번호 확인"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={handleChange}
          />
          <SubmitButton name={"회원가입"} />
        </Form>
      </Container>
    </Layout>
  );
}

export default SignUp;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 250px;
  width: 100%;
  height: 600px;
  background-color: white;
  border-radius: 10px;
`;

const Title = styled.div`
  margin-top: 20px;
  font-size: 25px;
`;

const Form = styled.form`
  gap: 20px;
  margin-top: 50px;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
`;
