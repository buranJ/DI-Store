export interface IUser {
  email: string;
  password: string;
  is_active?: boolean;
  is_superuser?: boolean;
  is_verified?: boolean;
  nickname: string;
  phone_number: string;
}

export interface ILoginParams {
  grant_type?: string;
  username: string;
  password: string;
  scope?: string;
  client_id?: string;
  client_secret?: string;
}

export interface IAuthResponse {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
}

export interface IRegisterUserParams {
  email: string;
  password: string;
  nickname: string;
  phone_number: string;
}

export interface IAuthResetPasswordParams {
  token: string;
  password: string;
}
