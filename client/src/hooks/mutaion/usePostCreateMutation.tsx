import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { postService } from "src/apis/postAPI";

function usePostCreateMutation() {
  const navigate = useNavigate();
  const createSuccessOption = {
    onSuccess: () => {
      alert("게시물이 등록되었습니다.");
      navigate("/");
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 404) {
        alert("링크가 잘못되었습니다. 유튜브 공유하기 링크를 복사해주세요.");
      }
    },
  };
  return useMutation(postService.createPost, createSuccessOption);
}

export default usePostCreateMutation;
