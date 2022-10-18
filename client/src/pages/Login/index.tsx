import styled from "@emotion/styled";
import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "src/components/Layout/Layout";

function Login() {
  const navigate = useNavigate();
  return (
    <Layout>
      <Logo>로그인</Logo>
    </Layout>
  );
}

export default Login;

const Logo = styled.div`
  font-size: 2rem;
`;
