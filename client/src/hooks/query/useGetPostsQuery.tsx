import { useInfiniteQuery } from "@tanstack/react-query";
import { postService } from "src/apis/postAPI";

function useGetPostsQuery() {
  return useInfiniteQuery(
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
}

export default useGetPostsQuery;
