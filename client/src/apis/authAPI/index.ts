import axios from "axios";
import { baseURL } from "..";

const instance = axios.create({
  baseURL: baseURL,
});

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
  try {
    const response = await instance.post<LoginBody>("/auth/login", formData);
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

export const authService = {
  emailDuplicate,
  signUp,
  login,
};
