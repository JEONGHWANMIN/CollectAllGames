export interface LoginFormType {
  email: string;
  password: string;
}

export interface LoginValidationType {
  email: boolean;
  username: boolean;
  password: boolean;
}

export interface JwtPayload {
  email: string;
  username: string;
  userId: number;
  iat: number;
  exp: number;
}

export interface SignUpFormType {
  email: string;
  username: string;
  password: string;
  passwordConfirm: string;
}

export interface CreatePostFormType {
  title: string;
  content: string;
  link: string;
  tags: string[];
}

export interface CommentForm {
  content: string;
}

export interface ValidationService {
  emailValidate: (email: string) => boolean;
  passwordValidate: (password: string) => boolean;
  passwordConfirmValidate: (password: string, passwordConfirm: string) => boolean;
  userNameValidate: (username: string) => boolean;
}

export interface SignUpValidationType {
  email: boolean;
  username: boolean;
  password: boolean;
  passwordConfirm: boolean;
}

export interface PostFormType {
  title: string;
  content: string;
  link: string;
}

export interface WriteFormType {
  title: string;
  content: string;
  link: string;
  tags: string[];
}
