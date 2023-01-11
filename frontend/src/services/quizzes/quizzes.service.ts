import HttpService from '../http/http.service';
import { IDeepQuiz, IQuiz } from '../../common/interfaces';
import { HttpMethod } from '../../common/enums';

class QuizzesService {
  protected readonly path: string;
  protected http: HttpService;

  constructor(path: string, http: HttpService) {
    this.path = path;
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

  public create = async (quiz: IDeepQuiz): Promise<IQuiz> => {
    return await this.http.load<IQuiz>(`${this.path}/`, {
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

export default QuizzesService;
