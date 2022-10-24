import axios from "axios";
import { getCookie, setCookie } from "src/utils/cookie";
import { baseURL } from "..";

const instance = axios.create({
  baseURL: baseURL,
});

instance.interceptors.request.use(
  (config) => {
    if (!config.headers) config.headers = {};
    if (config.headers["refresh-token"]) {
      const refreshToken = getCookie("refreshToken");
      config.headers.Authorization = "Bearer " + refreshToken;
    } else {
      const accessToken = getCookie("accessToken");
      if (accessToken) {
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
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        originalConfig.headers.Authorization = "Bearer " + getCookie("refreshToken");

        try {
          const response = await instance.post("/auth/refresh-tokens", null, {
            headers: {
              "refresh-token": true,
            },
          });

          const { accessToken, refreshToken } = response.data;

          setCookie("accessToken", accessToken);
          setCookie("refreshToken", refreshToken);

          originalConfig.headers.Authorization = `Bearer ${accessToken}`;

          return instance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
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

export const postService = {
  fetchPosts,
  likePost,
  unLikePost,
};
