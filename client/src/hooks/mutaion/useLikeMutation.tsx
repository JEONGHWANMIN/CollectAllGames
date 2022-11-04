import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postService } from "src/apis/postAPI";

function useLikeMutation(type: "post" | "posts", postId: number) {
  const queryClient = useQueryClient();

  const onSuccessOption = {
    onSuccess: () => {
      return type === "posts"
        ? queryClient.invalidateQueries(["posts"])
        : queryClient.invalidateQueries(["post", postId]);
    },
  };

  const { mutate: LikePost } = useMutation(
    (postId: number) => postService.likePost(postId),
    onSuccessOption
  );

  const { mutate: UnLikePost } = useMutation(
    (postId: number) => postService.unLikePost(postId),
    onSuccessOption
  );

  return { LikePost, UnLikePost };
}

export default useLikeMutation;
