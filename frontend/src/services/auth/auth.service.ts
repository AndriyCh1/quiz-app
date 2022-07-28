import HttpService from "../http/http.service";
import {ILoginUser, ILoginResponse, ILogoutResponse, IAuthResponse} from "../../common/interfaces";
import {HttpMethod} from "../../common/enums";
import {ISignupUser} from "../../common/interfaces/user";

class AuthService  {
    private readonly path: string;
    private http: HttpService;

    constructor(path: string, http: HttpService) {
        this.path = path;
        this.http = http;
    }

    public login = async(payload: ILoginUser): Promise<ILoginResponse> => {
        // TODO: find out should I do here json.stringify(payload)
        return this.http.load<ILoginResponse>(`${this.path}/auth/login`, {
            method: HttpMethod.POST,
            payload,
        })
    }

    public signup = async(payload: ISignupUser): Promise<IAuthResponse> => {
        return this.http.load<ILoginResponse>(`${this.path}/auth/register`, {
            method: HttpMethod.POST,
            payload,
        })
    }

    public logout = async(): Promise<ILogoutResponse> => {
        return this.http.load<ILogoutResponse>(`${this.path}/auth/logout`, {
            method: HttpMethod.POST,
        })
    }

    public refresh = async(): Promise<IAuthResponse> => {
        return this.http.load<IAuthResponse>(`${this.path}/auth/refresh`, {
            method: HttpMethod.GET,
        })
    }
}

export default AuthService;