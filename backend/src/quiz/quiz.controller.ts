import { NextFunction, Request, Response, Router } from 'express';

import { RoleType } from '../common/enums';
import { IAuthRequest } from '../common/interfaces';
import { IDeepQuiz } from '../common/interfaces/quizzes.interface';

import QuizDto from './dto/quiz.dto';
import DeepQuizDto from './dto/deep-quiz.dto';

import validationMiddleware from '../middlewares/validation.middleware';
import validatePermission from '../middlewares/validatePermission.middleware';

import QuizService from './quiz.service';

class QuizController {
  public path = '/quizzes';
  public router = Router();

  constructor(private readonly quizService: QuizService) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}/visitor`,
      validatePermission([RoleType.VISITOR, RoleType.USER]),
      this.getPublicQuizzes.bind(this),
    );
    this.router.get(
      `${this.path}/user`,
      validatePermission([RoleType.USER]),
      this.getQuizzes.bind(this),
    );
    this.router.get(
      `${this.path}/visitor/:id`,
      validatePermission([RoleType.VISITOR, RoleType.USER]),
      this.getPublicQuizById.bind(this),
    );
    this.router.get(
      `${this.path}/user/:id`,
      validatePermission([RoleType.USER]),
      this.getQuizById.bind(this),
    );
    this.router.post(
      `${this.path}/`,
      validatePermission([RoleType.USER]),
      validationMiddleware(DeepQuizDto),
      this.createDeepQuiz.bind(this),
    );
    this.router.put(
      `${this.path}/:id`,
      validatePermission([RoleType.USER]),
      this.updateQuiz.bind(this),
    );
    this.router.delete(
      `${this.path}/:id`,
      validatePermission([RoleType.USER]),
      this.deleteQuiz.bind(this),
    );
  }

  private async getQuizById(req: IAuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id as unknown as string;
      const quizId: string = req.params.id as unknown as string;
      const quiz = await this.quizService.getDeepById(quizId, userId);
      res.send(quiz);
    } catch (e) {
      next(e);
    }
  }

  private async getPublicQuizById(req: Request, res: Response, next: NextFunction) {
    try {
      const quizId: string = req.params.id as unknown as string;
      const quiz = await this.quizService.getPublicDeepById(quizId);
      res.send(quiz);
    } catch (e) {
      next(e);
    }
  }

  private async getQuizzes(req: IAuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id as unknown as string;
      const quizzes = await this.quizService.getAll(userId);
      res.send(quizzes);
    } catch (e) {
      next(e);
    }
  }

  private async getPublicQuizzes(req: Request, res: Response, next: NextFunction) {
    try {
      const quizzes = await this.quizService.getPublic();
      res.send(quizzes);
    } catch (e) {
      next(e);
    }
  }

  private async createQuiz(req: IAuthRequest, res: Response, next: NextFunction) {
    try {
      const quizData: IDeepQuiz = req.body as unknown as IDeepQuiz;
      const newQuiz = await this.quizService.create(req.user.id, quizData);
      res.send(newQuiz);
    } catch (e) {
      next(e);
    }
  }

  private async createDeepQuiz(req: IAuthRequest, res: Response, next: NextFunction) {
    try {
      const quizData: IDeepQuiz = req.body as unknown as IDeepQuiz;
      const newQuiz = await this.quizService.createDeep(req.user.id, quizData);
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
