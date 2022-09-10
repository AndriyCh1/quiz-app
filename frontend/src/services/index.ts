import { ENV } from '../common/enums';

import AuthService from './auth/auth.service';
import HttpService from './http/http.service';
import StorageService from './storage/storage.service';
import UserService from './user/user.service';
import VisitorQuizzesService from './visitor-quizzes/visitor-quizzes.service';

const apiConfig = { baseUrl: ENV.API_PATH || '', http: new HttpService() };

const authService = new AuthService(apiConfig.baseUrl, apiConfig.http);
const userService = new UserService(apiConfig.baseUrl, apiConfig.http);
const storageService = new StorageService(window.localStorage);
const visitorQuizzesService = new VisitorQuizzesService(apiConfig.baseUrl, apiConfig.http);

export { authService, storageService, userService, visitorQuizzesService };
