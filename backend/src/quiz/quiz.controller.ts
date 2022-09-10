import { NextFunction, Request, Response, Router } from 'express';
import QuizService from './quiz.service';
import QuizDto from './dto/quiz.dto';
import validationMiddleware from '../middlewares/validation.middleware';
import { IAuthRequest } from '../common/interfaces';

class QuizController {
  public path = '/quizzes';
  public router = Router();

  constructor(private readonly quizService: QuizService) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // TODO: separate users` access for this route
    // this.router.use(authMiddleware);
    this.router.get(`${this.path}/`, this.getAllQuizzes.bind(this));
    this.router.get(`${this.path}/:id`, this.getQuizById.bind(this));
    this.router.post(`${this.path}/`, validationMiddleware(QuizDto), this.createQuiz.bind(this));
    this.router.put(`${this.path}/:id`, this.updateQuiz.bind(this));
    this.router.delete(`${this.path}/:id`, this.deleteQuiz.bind(this));
  }

  private async getQuizById(req: Request, res: Response, next: NextFunction) {
    try {
      const quizId: string = req.params.id as unknown as string;
      const quiz = await this.quizService.getDeepById(quizId);
      res.send(quiz);
    } catch (e) {
      next(e);
    }
  }

  private async getAllQuizzes(req: Request, res: Response, next: NextFunction) {
    try {
      const quizzes = await this.quizService.getAll();
      res.send(quizzes);
    } catch (e) {
      next(e);
    }
  }

  private async createQuiz(req: IAuthRequest, res: Response, next: NextFunction) {
    try {
      const quizData: QuizDto = req.body as unknown as QuizDto;
      const newQuiz = await this.quizService.create(req.user.id, quizData);
      res.send(newQuiz);
    } catch (e) {
      next(e);
    }
  }

  private async deleteQuiz(req: IAuthRequest, res: Response, next: NextFunction) {
    try {
      const quizId: string = req.params.id as unknown as string;
      const quiz = await this.quizService.delete(quizId);
      res.send(quiz);
    } catch (e) {
      next(e);
    }
  }

  private async updateQuiz(req: IAuthRequest, res: Response, next: NextFunction) {
    try {
      const quizId: string = req.params.id as unknown as string;
      const quizData: QuizDto = req.body as unknown as QuizDto;
      const quiz = await this.quizService.update(quizId, quizData);
      res.send(quiz);
    } catch (e) {
      next(e);
    }
  }
}

export default QuizController;
