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

  public deleteById = async (id: IQuiz['id']): Promise<void> => {
    await this.http.load(`${this.path}/${id}`, {
      method: HttpMethod.DELETE,
    });
  };

  public update = async (data: any): Promise<void> => {
    await this.http.load(`${this.path}/${data.id}`, {
      method: HttpMethod.PUT,
      payload: data,
    });
  };
}

export default UserQuizzesService;
