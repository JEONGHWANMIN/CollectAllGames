import axios from "axios";
import { baseURL } from "..";

const instance = axios.create({
  baseURL: baseURL,
});

interface Duplicate {
  message: string;
  duplicate: boolean;
}

async function EmailDuplicate(email: string) {
  try {
    const response = await instance.get<Duplicate>(
      `/auth/check?email=${email}`
    );
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

export const authService = {
  EmailDuplicate,
};
