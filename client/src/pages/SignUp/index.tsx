import styled from "@emotion/styled";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "src/apis/authAPI";
import LabelInput from "src/components/Common/LabelInput";
import Layout from "src/components/Layout/Layout";
import SubmitButton from "src/components/Common/SubmitButton";
import useForm from "src/hooks/useForm";
import { validateService } from "src/utils/validation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SignUpFormType, SignUpValidationType, ValidationService } from "src/types/form";

const initialData = {
  email: "",
  username: "",
  password: "",
  passwordConfirm: "",
};

function SignUp() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [isDuplicate, setIsDuplicate] = useState<boolean>();

  const { mutate } = useMutation(["posts"], authService.signUp, {
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
      navigate("/login", { state: { page: "/signup" } });
    },
  });

  const handleSignUp = async (formData: typeof initialData) => {
    mutate(formData);
  };

  const { formData, handleChange, handleSubmit, errors } = useForm<
    SignUpFormType,
    ValidationService,
    SignUpValidationType
  >(initialData, handleSignUp, validateService);

  const { email, username, password, passwordConfirm } = formData;

  useEffect(() => {
    authService.emailDuplicate(email).then((res) => {
      setIsDuplicate(res?.duplicate);
    });
  }, [email]);

  return (
    <Layout>
      <Container>
        <Title>회원가입</Title>
        <Form onSubmit={handleSubmit}>
          <LabelInput
            type={"email"}
            label="이메일"
            name="email"
            value={email}
            onChange={handleChange}
            error={errors.email || isDuplicate}
            errorMessages={"이메일이 중복되었거나 형식에 맞지 않습니다."}
          />
          <LabelInput
            label="이름"
            name="username"
            value={username}
            onChange={handleChange}
            error={errors.username}
            errorMessages={"이름에 공백을 제거해주세요."}
          />
          <LabelInput
            type={"password"}
            label="비밀번호"
            name="password"
            value={password}
            onChange={handleChange}
            error={errors.password}
            errorMessages={"비밀번호는 8자 이상 영문 숫자 특수문자를 포함해주세요."}
          />
          <LabelInput
            type={"password"}
            label="비밀번호 확인"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={handleChange}
            error={errors.passwordConfirm}
            errorMessages={"비밀번호가 일치하지 않습니다."}
          />
          <SubmitButton name={"회원가입"} />
        </Form>
        <ExistUser onClick={() => navigate("/login")}>로그인 바로가기</ExistUser>
      </Container>
    </Layout>
  );
}

export default SignUp;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 150px;
  width: 100%;
  background-color: white;
  border-radius: 10px;
  padding-bottom: 20px;
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

const ExistUser = styled.p`
  margin-top: 20px;
  color: gray;
  text-decoration: underline;
  cursor: pointer;
`;
