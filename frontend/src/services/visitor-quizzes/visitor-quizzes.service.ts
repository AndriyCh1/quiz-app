import HttpService from '../http/http.service';
import QuizzesService from '../quizzes/quizzes.service';

class VisitorQuizzesService extends QuizzesService {
  constructor(path: string, http: HttpService) {
    super(path, http);
  }
}

export default VisitorQuizzesService;
