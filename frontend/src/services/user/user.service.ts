import HttpService from '../http/http.service';
import { IUserGeneralData, IUser } from '../../common/interfaces';
import { HttpMethod } from '../../common/enums';

class UserService {
  private readonly path: string;
  private http: HttpService;

  constructor(path: string, http: HttpService) {
    this.path = path;
    this.http = http;
  }

  public getAllUsers = async () => {
    return await this.http.load<IUser[]>(`${this.path}/user/users`, {
      method: HttpMethod.GET,
    });
  };

  public getUserGeneralData = async () => {
    return await this.http.load<IUserGeneralData>(`${this.path}/user/general`, {
      method: HttpMethod.GET,
      withCredentials: true,
    });
  };
}

export default UserService;
