export interface IUser {
  id?: number;
  email?: string;
  is_active: boolean;
  is_superuser: boolean;
  is_verified: boolean;
  name: string;
  nickname?: string;
  phone_number?: string;
}

export interface IUpdateUserParams {
  password?: string;
  email?: string;
  is_active?: boolean;
  is_superuser?: boolean;
  is_verified?: boolean;
  name?: string;
  nickname: string;
  phone_number: string;
}
