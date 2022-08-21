import HttpService from '../http/http.service';
import { ILogoutResponse, IUser } from '../../common/interfaces';
import { HttpMethod } from '../../common/enums';

class UserService {
  private readonly path: string;
  private http: HttpService;

  constructor(path: string, http: HttpService) {
    this.path = path;
    this.http = http;
  }

  public getAllUsers = async () => {
    return this.http.load<IUser[]>(`${this.path}/user/users`, {
      method: HttpMethod.GET,
    });
  };
}

export default UserService;
