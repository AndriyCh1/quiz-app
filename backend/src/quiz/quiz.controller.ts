import { NextFunction, Request, Response, Router } from 'express';

import { HttpCode, RoleType } from '../common/enums';
import { IAuthRequest } from '../common/interfaces';
import { IDeepQuiz } from '../common/interfaces';

import QuizDto from './dto/quiz.dto';
import validatePermission from '../middlewares/validatePermission.middleware';

import QuizService from './quiz.service';
import { IDeepUpdateQuiz } from '../common/interfaces/quizzes.interface';

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
      `${this.path}/user`,
      validatePermission([RoleType.USER]),
      // TODO: find out why validator throws an error on DeepQuizDto
      // validationMiddleware(DeepQuizDto),
      this.createDeepQuiz.bind(this),
    );
    this.router.put(
      `${this.path}/user/:id`,
      validatePermission([RoleType.USER]),
      this.updateDeepQuiz.bind(this),
    );
    this.router.delete(
      `${this.path}/user/:id`,
      validatePermission([RoleType.USER]),
      this.deleteQuiz.bind(this),
    );
  }

  private async getQuizById(req: IAuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id as unknown as string;
      const quizId: string = req.params.id as unknown as string;
      const quiz = await this.quizService.getDeepById(quizId, userId);
      res.status(HttpCode.OK).send(this.quizService.hideCorrectAnswers(quiz));
    } catch (e) {
      next(e);
    }
  }

  private async getPublicQuizById(req: Request, res: Response, next: NextFunction) {
    try {
      const quizId: string = req.params.id as unknown as string;
      const quiz = await this.quizService.getPublicDeepById(quizId);
      res.status(HttpCode.OK).send(this.quizService.hideCorrectAnswers(quiz));
    } catch (e) {
      next(e);
    }
  }

  private async getQuizzes(req: IAuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id as unknown as string;
      const quizzes = await this.quizService.getAll(userId);
      res.status(HttpCode.OK).send(quizzes);
    } catch (e) {
      next(e);
    }
  }

  private async getPublicQuizzes(req: Request, res: Response, next: NextFunction) {
    try {
      const quizzes = await this.quizService.getPublic();
      res.status(HttpCode.OK).send(quizzes);
    } catch (e) {
      next(e);
    }
  }

  private async createQuiz(req: IAuthRequest, res: Response, next: NextFunction) {
    try {
      const quizData: QuizDto = req.body as unknown as QuizDto;
      const newQuiz = await this.quizService.create(req.user.id, quizData);
      res.status(HttpCode.CREATED).send(newQuiz);
    } catch (e) {
      next(e);
    }
  }

  private async createDeepQuiz(req: IAuthRequest, res: Response, next: NextFunction) {
    try {
      const quizData: IDeepQuiz = req.body as unknown as IDeepQuiz;
      const newQuiz = await this.quizService.createDeep(req.user.id, quizData);
      res.status(HttpCode.CREATED).send(this.quizService.hideCorrectAnswers(newQuiz));
    } catch (e) {
      next(e);
    }
  }

  private async deleteQuiz(req: IAuthRequest, res: Response, next: NextFunction) {
    try {
      const quizId: string = req.params.id as unknown as string;
      await this.quizService.delete(quizId);
      res.status(HttpCode.NO_CONTENT).send();
    } catch (e) {
      next(e);
    }
  }

  private async updateDeepQuiz(req: IAuthRequest, res: Response, next: NextFunction) {
    try {
      const quizId: string = req.params.id as unknown as string;
      const quizData: IDeepUpdateQuiz = req.body as unknown as IDeepUpdateQuiz;
      const updatedQuiz = await this.quizService.updateDeep(quizId, quizData);
      res.status(HttpCode.CREATED).send(updatedQuiz);
    } catch (e) {
      next(e);
    }
  }
}

export default QuizController;
