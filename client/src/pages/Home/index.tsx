/** @jsxImportSource @emotion/react */
import React from "react";
import { useLoaderData } from "react-router";
import Layout from "src/components/Layout/Layout";

function Home() {
  const user = useLoaderData();

  console.log(user);

  return (
    <Layout>
      <h1>Home</h1>
    </Layout>
  );
}

export default Home;
