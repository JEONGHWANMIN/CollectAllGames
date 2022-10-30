import axios from "axios";
import { CommentForm, CreatePostFormType } from "src/types/form";
import { Post } from "src/types/post";
import { getCookie, removeCookie, setCookie } from "src/utils/cookie";
import { baseURL } from "..";

const instance = axios.create({
  baseURL: baseURL,
});

instance.interceptors.request.use(
  (config) => {
    if (!config.headers) config.headers = {};
    if (getCookie("accessToken") && getCookie("refreshToken")) {
      if (config.headers["refresh-token"]) {
        const refreshToken = getCookie("refreshToken");
        config.headers.Authorization = "Bearer " + refreshToken;
      } else {
        const accessToken = getCookie("accessToken");
        config.headers.Authorization = "Bearer " + accessToken;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (err.response) {
      if (err.response.status === 403) {
        removeCookie("accessToken");
        removeCookie("refreshToken");
      } else if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        const refreshToken = getCookie("refreshToken");
        instance.defaults.headers.common["Authorization"] = "Bearer " + refreshToken;

        if (getCookie("refreshToken") && getCookie("accessToken")) {
          try {
            const response = await instance.post("/auth/refresh-tokens", null, {
              headers: {
                "refresh-token": true,
              },
            });

            const { accessToken, refreshToken } = response.data;

            setCookie("accessToken", accessToken);
            setCookie("refreshToken", refreshToken);

            instance.defaults.headers.common["Authorization"] = "Bearer " + accessToken;

            if (originalConfig.url.includes("like")) {
              const postId = originalConfig.url.split("/")[2];
              if (originalConfig.method === "post") {
                return likePost(Number(postId));
              } else {
                return unLikePost(Number(postId));
              }
            }

            return instance(originalConfig);
          } catch (_error) {
            return Promise.reject(_error);
          }
        }
      }
    }

    return Promise.reject(err);
  }
);

const fetchPosts = async (page: number) => {
  try {
    const response = await instance.get(`/posts?size=5&page=${page}`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

const fetchPost = async (postId: number) => {
  try {
    const response = await instance.get<Post>(`/posts/${postId}`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

const createPost = async (postForm: CreatePostFormType) => {
  const response = await instance.post("/posts", postForm);
  return response.data;
};

const likePost = async (postId: number) => {
  try {
    const response = await instance.post(`/posts/${postId}/like`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

const unLikePost = async (postId: number) => {
  try {
    const response = await instance.delete(`/posts/${postId}/like`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

const createComment = async (postId: number, commentForm: CommentForm) => {
  try {
    const response = await instance.post(`/comment/${postId}`, commentForm);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

const deleteComment = async (commentId: number) => {
  try {
    const response = await instance.delete(`/comment/${commentId}`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

const updateComment = async (commentId: number, commentForm: CommentForm) => {
  try {
    const response = await instance.put(`/comment/${commentId}`, commentForm);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const postService = {
  fetchPosts,
  fetchPost,
  createPost,
  likePost,
  unLikePost,
  createComment,
  deleteComment,
  updateComment,
};
