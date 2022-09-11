import { IDataInToken } from './dataInToken.inteface';
import { Request } from 'express';
import { RoleType } from '../enums';

interface IRequestWithUserData extends Request {
  user: IDataInToken;
  userRole: RoleType;
}

export type IAuthRequest = IRequestWithUserData & {
  headers: { authorization: string };
};
