import HttpService from '../http/http.service';
import {
  IFinishResponse,
  IQuizzesSummary,
  ISendAnswerRequest,
  ITakeStartResponse,
  IFinishRequest,
} from '../../common/interfaces';
import { HttpMethod } from '../../common/enums';

class TakeService {
  protected readonly path: string;
  protected http: HttpService;

  constructor(path: string, http: HttpService) {
    this.path = path;
    this.http = http;
  }

  public start = async (quizId: string): Promise<ITakeStartResponse> => {
    return await this.http.load<ITakeStartResponse>(`${this.path}/start/${quizId}`, {
      method: HttpMethod.POST,
    });
  };

  public sendAnswer = async (data: ISendAnswerRequest): Promise<void> => {
    const { takeId, questionId, answerId } = data;

    await this.http.load(`${this.path}/${takeId}/question/${questionId}/answer/${answerId}`, {
      method: HttpMethod.POST,
    });
  };

  public finish = async (data: IFinishRequest): Promise<IFinishResponse> => {
    const { takeId, spentTime } = data;

    return await this.http.load<IFinishResponse>(`${this.path}/finish/${takeId}`, {
      method: HttpMethod.PUT,
      payload: { spentTime },
    });
  };

  public getUserQuizzesSummary = async (): Promise<IQuizzesSummary[]> => {
    return await this.http.load<IQuizzesSummary[]>(`${this.path}/summary`, {
      method: HttpMethod.GET,
    });
  };
}

export default TakeService;
