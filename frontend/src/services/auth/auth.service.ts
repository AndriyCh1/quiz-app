import HttpService from '../http/http.service';
import { ILoginUser, ILogoutResponse, IAuthResponse, ISignupUser } from '../../common/interfaces';
import { ContentType, HttpMethod } from '../../common/enums';

class AuthService {
  private readonly path: string;
  private http: HttpService;

  constructor(path: string, http: HttpService) {
    this.path = path;
    this.http = http;
  }

  public login = async (payload: ILoginUser): Promise<IAuthResponse> => {
    // TODO: find out should I do here json.stringify(payload)
    return this.http.load<IAuthResponse>(`${this.path}/auth/login`, {
      method: HttpMethod.POST,
      payload,
    });
  };

  public signup = async (payload: ISignupUser): Promise<IAuthResponse> => {
    let formData = new FormData();

    if (payload.fullName) formData.append('fullName', payload.fullName);
    if (payload.avatar) formData.append('avatar', payload.avatar);
    formData.append('email', payload.email);
    formData.append('password', payload.password);

    return this.http.load<IAuthResponse>(`${this.path}/auth/register`, {
      method: HttpMethod.POST,
      contentType: ContentType.MULTIPART_FORM_DATA,
      payload: formData,
    });
  };

  public logout = async (): Promise<ILogoutResponse> => {
    return this.http.load<ILogoutResponse>(`${this.path}/auth/logout`, {
      method: HttpMethod.POST,
    });
  };

  public refresh = async (): Promise<IAuthResponse> => {
    return this.http.load<IAuthResponse>(`${this.path}/auth/refresh`, {
      method: HttpMethod.GET,
    });
  };
}

export default AuthService;
