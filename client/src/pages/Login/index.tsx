import styled from "@emotion/styled";
import React from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "src/apis/authAPI";
import LabelInput from "src/components/LabelInput/LabelInput";
import Layout from "src/components/Layout/Layout";
import SubmitButton from "src/components/SubmitButton/SubmitButton";
import useForm from "src/hooks/useForm";

const initialData = {
  email: "",
  password: "",
};

interface FormType {
  email: string;
  password: string;
}

interface ValidationType {
  email: boolean;
  username: boolean;
  password: boolean;
}

function Login() {
  const navigate = useNavigate();

  const handleLogin = async (formData: typeof initialData) => {
    console.log("FormData", formData);
    const result = await authService.Login(formData);
    if (result?.status === 200) {
      console.log(result.data);
      alert("로그인 성공");
      // return navigate("/");
    }
    alert("로그인 실패");
  };
  const { formData, handleChange, handleSubmit } = useForm<
    FormType,
    any,
    ValidationType
  >(initialData, handleLogin);

  const { email, password } = formData;

  return (
    <Layout>
      <Container>
        <Title>로그인</Title>
        <Form onSubmit={handleSubmit}>
          <LabelInput
            label="이메일"
            name="email"
            value={email}
            onChange={handleChange}
          />
          <LabelInput
            label="비밀번호"
            name="password"
            value={password}
            onChange={handleChange}
          />
          <SubmitButton name={"로그인"} />
        </Form>
      </Container>
    </Layout>
  );
}

export default Login;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 150px;
  width: 100%;
  height: 450px;
  background-color: white;
  border-radius: 10px;
`;

const Title = styled.div`
  margin-top: 20px;
  font-size: 25px;
`;

const Form = styled.form`
  gap: 15px;
  margin-top: 50px;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
`;
