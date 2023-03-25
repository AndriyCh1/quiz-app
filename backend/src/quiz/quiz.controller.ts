import { NextFunction, Request, Response, Router } from 'express';

import { HttpCode, RoleType } from '../common/enums';
import { IAuthRequest, IController, IDeepQuiz, IDeepUpdateQuiz } from '../common/interfaces';

import validatePermission from '../middlewares/validatePermission.middleware';

import QuizService from './quiz.service';

class QuizController implements IController {
  public path = '/quizzes';
  public router = Router();

  constructor(private readonly quizService: QuizService) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/`, this.getAllQuizzes.bind(this));
    this.router.get(`${this.path}/:id`, this.getQuizById.bind(this));
    this.router.get(`${this.path}/:quizId/answer/:answerId`, this.checkIfAnswerCorrect.bind(this));
    this.router.post(
      `${this.path}/`,
      validatePermission([RoleType.USER]),
      this.createDeepQuiz.bind(this),
    );
    this.router.put(
      `${this.path}/:id`,
      validatePermission([RoleType.USER]),
      this.updateDeepQuiz.bind(this),
    );
    this.router.delete(
      `${this.path}/:id`,
      validatePermission([RoleType.USER]),
      this.deleteQuiz.bind(this),
    );
  }

  private async getQuizById(req: IAuthRequest, res: Response, next: NextFunction) {
    try {
      const quizId: string = req.params.id;
      let quiz;

      if (req.user) {
        const userId: string = req.user.id;
        quiz = await this.quizService.getDeepById(quizId, userId);
      } else {
        quiz = await this.quizService.getPublicDeepById(quizId);
      }

      res.status(HttpCode.OK).send(this.quizService.hideCorrectAnswers(quiz));
    } catch (e) {
      next(e);
    }
  }

  private async getAllQuizzes(req: IAuthRequest, res: Response, next: NextFunction) {
    try {
      let quizzes;

      if (req.user) {
        const userId: string = req.user.id;
        quizzes = await this.quizService.getAll(userId);
      } else {
        quizzes = await this.quizService.getPublic();
      }

      res.status(HttpCode.OK).send(quizzes);
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

  private async checkIfAnswerCorrect(req: Request, res: Response, next: NextFunction) {
    try {
      const { quizId, answerId } = req.params;
      const isCorrect = await this.quizService.checkIfAnswerCorrect(quizId, answerId);
      res.status(HttpCode.OK).send({ correct: isCorrect });
    } catch (e) {
      next(e);
    }
  }
}

export default QuizController;
