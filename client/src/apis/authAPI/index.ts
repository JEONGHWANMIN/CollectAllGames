import axios from "axios";
import { getCookie } from "src/utils/cookie";
import { baseURL } from "..";

interface Duplicate {
  message: string;
  duplicate: boolean;
}

interface SignUpType {
  email: string;
  password: string;
  username: string;
}

interface LoginType {
  email: string;
  password: string;
}

interface LoginBody {
  accessToken: string;
  refreshToken: string;
}

const instance = axios.create({
  baseURL: baseURL,
});

async function emailDuplicate(email: string) {
  try {
    const response = await instance.get<Duplicate>(`/auth/check?email=${email}`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

async function signUp(formData: SignUpType) {
  try {
    const response = await instance.post("/auth/signup", formData);
    return response;
  } catch (e) {
    console.log(e);
  }
}

async function login(formData: LoginType) {
  const response = await instance.post<LoginBody>("/auth/login", formData);
  return response.data;
}

async function logOut() {
  try {
    const response = await instance.post("/auth/logout", null, {
      headers: {
        logout: true,
        Authorization: "Bearer " + getCookie("refreshToken"),
      },
    });
    return response;
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);
    }
  }
}

export const authService = {
  emailDuplicate,
  signUp,
  login,
  logOut,
};
