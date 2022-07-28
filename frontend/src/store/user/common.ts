import { IUser} from "../../common/interfaces";

export interface IUserState {
    users: IUser[] | null;
}

export enum UserAction {
    GET_ALL = 'GET_ALL',
}
