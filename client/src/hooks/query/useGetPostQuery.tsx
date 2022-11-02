import { useQuery } from "@tanstack/react-query";
import { postService } from "src/apis/postAPI";

function useGetPostQuery(id: Number) {
  return useQuery(["post", Number(id)], () => {
    return postService.fetchPost(Number(id));
  });
}

export default useGetPostQuery;
