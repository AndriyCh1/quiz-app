import { IAuthResponse } from '../../common/interfaces';

export interface IAuthState {
  user: IAuthResponse['user'] | null;
  isAuth: boolean;
  isLoading: boolean;
}

export enum AuthAction {
  LOGIN = 'LOGIN',
  SIGNUP = 'SIGNUP',
  LOGOUT = 'LOGOUT',
  CHECK_AUTH = 'CHECK_AUTH',
}
