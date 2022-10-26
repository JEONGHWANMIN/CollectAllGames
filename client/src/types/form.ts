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
