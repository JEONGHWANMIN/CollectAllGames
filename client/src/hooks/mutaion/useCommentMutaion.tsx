import { useMutation } from "@tanstack/react-query";
import { postService } from "src/apis/postAPI";

function useCommentMutaion(option = {}) {
  const { mutate: createComment } = useMutation(
    ({ postId, comment }: { postId: number; comment: string }) =>
      postService.createComment(postId, { content: comment }),
    option
  );

  const { mutate: deleteComment } = useMutation(
    (commentId: number) => postService.deleteComment(commentId),
    option
  );

  const { mutate: updateComment } = useMutation(
    ({ commentId, comment }: { commentId: number; comment: string }) =>
      postService.updateComment(commentId, { content: comment }),
    option
  );

  return {
    createComment,
    deleteComment,
    updateComment,
  };
}

export default useCommentMutaion;
