/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import React, { useEffect } from "react";
import PostCard from "src/components/Home/PostCard";
import Layout from "src/components/Layout/Layout";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { Post } from "src/types/post";
import { postService } from "src/apis/postAPI";

function Home() {
  const { ref, inView } = useInView();

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ["posts"],
    async ({ pageParam = 1 }) => postService.fetchPosts(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        const maxPage = lastPage.totalPage;
        const nextPage = allPages.length + 1;
        return nextPage <= maxPage ? nextPage : undefined;
      },
    }
  );

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  console.log(data);
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
