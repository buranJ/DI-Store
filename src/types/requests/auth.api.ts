import {
  IAuthResetPasswordParams,
  ILoginParams,
  IRegisterUserParams,
} from 'types/entities';

export module IAuthLogin {
  export type IParams = ILoginParams;
  export interface IResponse {
    access_token: string;
    token_type: string;
  }
}

export module IAuthRegister {
  export type IParams = IRegisterUserParams;
  export type Response = {
    access_token: string;
  };
}

export module IAuthLogout {
  export type Params = Record<string, never>;
  export type Response = Record<string, never>;
}

export module IAuthForgotPassword {
  export type Params = {
    email: string;
  };
  export type Response = Record<string, never>;
}

export module IAuthResetPassword {
  export type Params = IAuthResetPasswordParams;
  export type Response = Record<string, never>;
}
