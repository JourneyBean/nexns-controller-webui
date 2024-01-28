export interface IUser {
  readonly id: number;
  username: string;
  email: string;
}

export interface ICsrfTokenResponse {
  csrf_token: string;
}
