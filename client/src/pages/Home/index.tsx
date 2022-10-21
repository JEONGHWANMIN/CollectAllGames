/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import React from "react";
import { useLoaderData } from "react-router";
import PostCard from "src/components/Home/PostCard";
import Layout from "src/components/Layout/Layout";
import { displayedAt } from "src/utils/convertToTIme";

function Home() {
  const user = useLoaderData();

  console.log(user);

  console.log(displayedAt("2022-10-20T11:51:18.810Z"));
  return (
    <Layout>
      <HomeContainer>
        <PostCard></PostCard>
      </HomeContainer>
    </Layout>
  );
}

export default Home;

const HomeContainer = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
`;
