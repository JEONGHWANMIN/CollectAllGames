import styled from "@emotion/styled";
import jwtDecode from "jwt-decode";
import React, { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import LabelInput from "src/components/Common/LabelInput";
import Layout from "src/components/Layout/Layout";
import SubmitButton from "src/components/Common/SubmitButton";
import { useUserState } from "src/context/userContext";
import useForm from "src/hooks/useForm";
import { setCookie } from "src/utils/cookie";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { authService } from "src/apis/authAPI";

const initialData = {
  email: "",
  password: "",
};

interface UserState {
  email: string;
  username: string;
  accessToken: string;
  userId: number;
}

interface FormType {
  email: string;
  password: string;
}

interface ValidationType {
  email: boolean;
  username: boolean;
  password: boolean;
}

interface JwtPayload {
  email: string;
  username: string;
  userId: number;
  iat: number;
  exp: number;
}

function Login() {
  const navigate = useNavigate();

  const [user, setUser] = useUserState() as [UserState, Dispatch<SetStateAction<UserState>>];

  console.log(user);

  const { mutate, isLoading, isError, error, isSuccess } = useMutation(
    ["posts"],
    authService.login,
    {
      onSuccess: (data) => {
        if (!data) return null;
        const { accessToken, refreshToken } = data;
        const { email, username, userId } = jwtDecode<JwtPayload>(accessToken);
        setUser({
          email,
          username,
          accessToken,
          userId,
        });
        setCookie("accessToken", accessToken);
        setCookie("refreshToken", refreshToken);
        navigate("/");
      },
    }
  );

  const handleLogin = async (formData: typeof initialData) => {
    mutate(formData);
  };

  const { formData, handleChange, handleSubmit } = useForm<FormType, any, ValidationType>(
    initialData,
    handleLogin
  );

  const { email, password } = formData;

  return (
    <Layout>
      <Container>
        <Title>로그인</Title>
        <Form onSubmit={handleSubmit}>
          <LabelInput label="이메일" name="email" value={email} onChange={handleChange} />
          <LabelInput label="비밀번호" name="password" value={password} onChange={handleChange} />
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
