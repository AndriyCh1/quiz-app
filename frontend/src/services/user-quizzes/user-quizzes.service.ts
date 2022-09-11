import HttpService from '../http/http.service';
import QuizzesService from '../quizzes/quizzes.service';

class UserQuizzesService extends QuizzesService {
  constructor(path: string, http: HttpService) {
    super(`${path}/quizzes/user`, http);
  }
}

export default UserQuizzesService;
