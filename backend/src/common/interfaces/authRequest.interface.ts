import { IDataInToken } from './dataInToken.inteface';
import { Request } from 'express';

interface IRequestWithUserData extends Request {
  user: IDataInToken;
}

export type IAuthRequest = IRequestWithUserData & {
  headers: { authorization: string };
};
