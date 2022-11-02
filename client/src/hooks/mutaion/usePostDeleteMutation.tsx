import { useMutation } from "@tanstack/react-query";
import { postService } from "src/apis/postAPI";

function usePostDeleteMutation(option = {}) {
  return useMutation((postId: number) => postService.deletePost(postId), option);
}

export default usePostDeleteMutation;
