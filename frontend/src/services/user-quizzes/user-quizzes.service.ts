import HttpService from '../http/http.service';
import QuizzesService from '../quizzes/quizzes.service';
import { IDeepQuiz, IQuiz } from '../../common/interfaces';
import { HttpMethod } from '../../common/enums';

class UserQuizzesService extends QuizzesService {
  constructor(path: string, http: HttpService) {
    super(`${path}/quizzes/user`, http);
  }

  public create = async (quiz: IDeepQuiz): Promise<IQuiz> => {
    return await this.http.load<IQuiz>(`${this.path}`, {
      method: HttpMethod.POST,
      payload: quiz,
    });
  };
}

export default UserQuizzesService;
