import HttpService from '../http/http.service';
import { IQuiz } from '../../common/interfaces';
import { HttpMethod } from '../../common/enums';

class QuizzesService {
  protected readonly path: string;
  protected http: HttpService;

  constructor(path: string, http: HttpService) {
    this.path = '/quizzes';
    this.http = http;
  }

  public getAll = async () => {
    return await this.http.load<IQuiz[]>(`${this.path}`, {
      method: HttpMethod.GET,
      withCredentials: false,
    });
  };

  public getOneById = async (id: IQuiz['id']) => {
    return await this.http.load<IQuiz>(`${this.path}/${id}`, {
      method: HttpMethod.GET,
      withCredentials: false,
    });
  };
}

export default QuizzesService;
