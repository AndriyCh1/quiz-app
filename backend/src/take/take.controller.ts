import { NextFunction, Response, Router } from 'express';
import { IAuthRequest, IController } from '../common/interfaces';
import authMiddleware from '../middlewares/authMiddleware';
import TakeService from './take.service';
import { HttpCode, RoleType } from '../common/enums';
import validatePermission from '../middlewares/validatePermission.middleware';

class TakeController implements IController {
  public path = '/take';
  public router = Router();

  constructor(private readonly takeService: TakeService) {
    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/:quizId`,
      validatePermission([RoleType.USER]),
      this.takeQuiz.bind(this),
    );
    this.router.post(
      `${this.path}/:takeId/question/:questionId/answer/:answerId`,
      validatePermission([RoleType.USER]),
      this.saveAnswer.bind(this),
    );
  }

  private initializeMiddlewares() {
    this.router.use(authMiddleware);
  }

  private async takeQuiz(req: IAuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id;
      const quizId = req.params.quizId;
      const take = await this.takeService.saveQuizAttempt(userId, quizId);
      res.status(HttpCode.OK).send(take);
    } catch (e) {
      next(e);
    }
  }

  private async saveAnswer(req: IAuthRequest, res: Response, next: NextFunction) {
    try {
      const { takeId, questionId, answerId } = req.params;
      await this.takeService.saveAnswer(takeId, questionId, answerId);
      res.status(HttpCode.NO_CONTENT).send();
    } catch (e) {
      next(e);
    }
  }
}

export default TakeController;
