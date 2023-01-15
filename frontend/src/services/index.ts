import { ENV } from '../common/enums';

import AuthService from './auth/auth.service';
import HttpService from './http/http.service';
import StorageService from './storage/storage.service';
import UserService from './user/user.service';
import QuizzesService from './quizzes/quizzes.service';
import TakeService from './take/take.service';

const apiConfig = { baseUrl: ENV.API_PATH || '', http: new HttpService() };

// TODO: refactor baseUrls
const authService = new AuthService(apiConfig.baseUrl, apiConfig.http);
const userService = new UserService(apiConfig.baseUrl, apiConfig.http);
const storageService = new StorageService(window.localStorage);
const quizzesService = new QuizzesService(`${apiConfig.baseUrl}/quizzes`, apiConfig.http);
const takeService = new TakeService(`${apiConfig.baseUrl}/take`, apiConfig.http);

export { authService, storageService, userService, quizzesService, takeService };
