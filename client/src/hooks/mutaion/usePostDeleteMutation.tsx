import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { postService } from "src/apis/postAPI";

function usePostDeleteMutation() {
  const navigate = useNavigate();

  const deletePostSuccessOption = {
    onSuccess: () => {
      navigate("/");
    },
  };
  return useMutation((postId: number) => postService.deletePost(postId), deletePostSuccessOption);
}

export default usePostDeleteMutation;
