import { useMutation } from "@tanstack/react-query";
import { postService } from "src/apis/postAPI";

function useLikeMutation(option = {}) {
  const { mutate: LikePost } = useMutation(
    (postId: number) => postService.likePost(postId),
    option
  );

  const { mutate: UnLikePost } = useMutation(
    (postId: number) => postService.unLikePost(postId),
    option
  );

  return { LikePost, UnLikePost };
}

export default useLikeMutation;
