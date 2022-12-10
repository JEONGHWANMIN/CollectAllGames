/* eslint-disable react-hooks/exhaustive-deps */
import styled from "@emotion/styled";
import React, { useEffect } from "react";
import PostCard from "src/components/Home/PostCard";
import Layout from "src/components/Layout/Layout";
import { Post } from "src/types/post";
import { removeCookie } from "src/utils/cookie";
import useHomeFetch from "src/hooks/useHomeFetch";

function Home() {
  const { ref, data } = useHomeFetch();

  useEffect(() => {
    window.onbeforeunload = function (e) {
      window.onunload = function () {
        removeCookie("accessToken");
        removeCookie("refreshToken");
      };
      return undefined;
    };
  }, []);

  return (
    <Layout>
      <HomeContainer>
        {data?.pages?.map((page, i) => (
          <React.Fragment key={i}>
            {page.posts.map((post: Post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </React.Fragment>
        ))}
        <div ref={ref}></div>
      </HomeContainer>
    </Layout>
  );
}

export default Home;

const HomeContainer = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
`;
