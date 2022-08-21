import { ENV } from '../common/enums';

import AuthService from './auth/auth.service';
import HttpService from './http/http.service';
import StorageService from './storage/storage.service';
import UserService from './user/user.service';

const apiConfig = { baseUrl: ENV.API_PATH || '', http: new HttpService() };

const authService = new AuthService(apiConfig.baseUrl, apiConfig.http);
const userService = new UserService(apiConfig.baseUrl, apiConfig.http);
const storageService = new StorageService(window.localStorage);

export { authService, storageService, userService };
