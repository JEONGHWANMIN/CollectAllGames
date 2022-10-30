import styled from "@emotion/styled";
import jwtDecode from "jwt-decode";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LabelInput from "src/components/Common/LabelInput";
import Layout from "src/components/Layout/Layout";
import SubmitButton from "src/components/Common/SubmitButton";
import { useUserState } from "src/context/userContext";
import useForm from "src/hooks/useForm";
import { setCookie } from "src/utils/cookie";
import { useMutation } from "@tanstack/react-query";
import { authService } from "src/apis/authAPI";
import { UserState } from "src/types/user";
import { LoginFormType, LoginValidationType, JwtPayload } from "src/types/form";
import { AxiosError } from "axios";

const initialData = {
  email: "",
  password: "",
};

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [error, setError] = useState(false);
  const [, setUser] = useUserState() as [UserState, Dispatch<SetStateAction<UserState>>];

  const { mutate } = useMutation(["posts"], authService.login, {
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

      if (location.state !== null && location.state.page === "/signup") {
        return navigate("/");
      }

      navigate(-1);
    },
    onError: (error: AxiosError) => {
      const { response } = error;
      if (response?.status === 403 || response?.status === 401 || response?.status === 400) {
        setError(true);
      }
    },
  });

  const handleLogin = async (formData: typeof initialData) => {
    mutate(formData);
  };

  const { formData, handleChange, handleSubmit } = useForm<LoginFormType, any, LoginValidationType>(
    initialData,
    handleLogin
  );

  const { email, password } = formData;

  return (
    <Layout>
      <Container>
        <Title>로그인</Title>
        <Form onSubmit={handleSubmit}>
          <LabelInput
            type={"email"}
            label="이메일"
            name="email"
            value={email}
            onChange={handleChange}
          />
          <LabelInput
            type={"password"}
            label="비밀번호"
            name="password"
            value={password}
            onChange={handleChange}
          />
          <SubmitButton name={"로그인"} />
          {error && <Error>이메일 비밀번호가 유효하지 않습니다.</Error>}
        </Form>
        <NewUser onClick={() => navigate("/signup")}>회원가입 바로가기</NewUser>
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

const Error = styled.div`
  color: red;
  font-size: 12px;
  height: 15px;
`;

const NewUser = styled.p`
  margin-top: 20px;
  color: gray;
  text-decoration: underline;
  cursor: pointer;
`;
