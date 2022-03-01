export interface ILoginResponse {
  userId: number;
  username: string;
  token: string;
}

export interface ILoginRequest {
  username: string;
  password: string;
}
