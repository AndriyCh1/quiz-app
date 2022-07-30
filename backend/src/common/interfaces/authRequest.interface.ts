import {IDataInToken} from "./dataInToken.inteface";

interface IRequestWithUserData extends Request {
    user: IDataInToken;
}

export type IAuthRequest = IRequestWithUserData & {
    headers: { authorization: string };
};