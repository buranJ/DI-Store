import { IUpdateUserParams, IUser } from 'types/entities';

export module IGetCurrentUser {
  export type Response = IUser;
  export type Params = void;
}

export module IUpdateCurrentUser {
  export type Response = IUser;
  export type Params = IUpdateUserParams;
}

export module IGetUser {
  export type Response = IUser;
  export type Params = { id: number };
}

export module IDeleteUser {
  export type Response = void;
  export type Params = { id: number };
}
