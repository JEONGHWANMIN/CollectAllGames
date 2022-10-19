import styled from "@emotion/styled";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "src/apis/authAPI";
import LabelInput from "src/components/LabelInput/LabelInput";
import Layout from "src/components/Layout/Layout";
import SubmitButton from "src/components/SubmitButton/SubmitButton";
import useForm from "src/hooks/useForm";
import { validateService } from "src/utils/validation";

interface FormType {
  email: string;
  username: string;
  password: string;
  passwordConfirm: string;
}

interface ValidationService {
  emailValidate: (email: string) => boolean;
  passwordValidate: (password: string) => boolean;
  passwordConfirmValidate: (
    password: string,
    passwordConfirm: string
  ) => boolean;
  userNameValidate: (username: string) => boolean;
}

interface ValidationType {
  email: boolean;
  username: boolean;
  password: boolean;
  passwordConfirm: boolean;
}

const initialData = {
  email: "",
  username: "",
  password: "",
  passwordConfirm: "",
};

function SignUp() {
  const navigate = useNavigate();

  const [isDuplicate, setIsDuplicate] = useState<boolean>();

  const handleSignUp = async (formData: typeof initialData) => {
    const result = await authService.SignUp(formData);
    if (result?.status === 201) {
      alert("회원가입이 완료되었습니다.");
      return navigate("/login");
    }
    alert("회원가입에 실패했습니다.");
  };

  const { formData, handleChange, handleSubmit, errors } = useForm<
    FormType,
    ValidationService,
    ValidationType
  >(initialData, handleSignUp, validateService);

  const { email, username, password, passwordConfirm } = formData;

  useEffect(() => {
    authService.EmailDuplicate(email).then((res) => {
      setIsDuplicate(res?.duplicate);
    });
  }, [email]);

  return (
    <Layout>
      <Container>
        <Title>회원가입</Title>
        <Form onSubmit={handleSubmit}>
          <LabelInput
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
            label="비밀번호"
            name="password"
            value={password}
            onChange={handleChange}
            error={errors.password}
            errorMessages={
              "비밀번호는 8자 이상 영문 숫자 특수문자를 포함해주세요."
            }
          />
          <LabelInput
            label="비밀번호 확인"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={handleChange}
            error={errors.passwordConfirm}
            errorMessages={"비밀번호가 일치하지 않습니다."}
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
  margin-top: 150px;
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
  gap: 15px;
  margin-top: 50px;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
`;
