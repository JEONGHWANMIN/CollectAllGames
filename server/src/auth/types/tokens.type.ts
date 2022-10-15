export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export type JwtPayload = {
  iat: number;
  exp: number;
  userId: number;
  email: string;
  username: string;
};
