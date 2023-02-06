import { NextFunction, Response, Router } from 'express';
import { IAuthRequest, IController } from '../common/interfaces';
import TakeService from './take.service';
import { HttpCode, RoleType, TakeStatuses } from '../common/enums';
import validatePermission from '../middlewares/validatePermission.middleware';
import validationMiddleware from '../middlewares/validation.middleware';
import FinishTakeDto from './dto/finish-take.dto';

class TakeController implements IController {
  public path = '/take';
  public router = Router();

  constructor(private readonly takeService: TakeService) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}/summary`,
      validatePermission([RoleType.USER]),
      this.getQuizzesSummary.bind(this),
    );
    this.router.post(
      `${this.path}/start/:quizId`,
      validatePermission([RoleType.USER]),
      this.takeQuiz.bind(this),
    );
    this.router.put(
      `${this.path}/finish/:takeId`,
      validatePermission([RoleType.USER]),
      validationMiddleware(FinishTakeDto),
      this.finishTake.bind(this),
    );

    this.router.post(
      `${this.path}/:takeId/question/:questionId/answer/:answerId`,
      validatePermission([RoleType.USER]),
      this.saveAnswer.bind(this),
    );
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

  private async finishTake(req: IAuthRequest, res: Response, next: NextFunction) {
    try {
      const { takeId } = req.params;
      const { spentTime } = req.body;
      await this.takeService.update(takeId, { status: TakeStatuses.FINISHED, spentTime });
      const result = await this.takeService.getResults(takeId);
      res.status(HttpCode.OK).send(result);
    } catch (e) {
      next(e);
    }
  }

  private async getQuizzesSummary(req: IAuthRequest, res: Response, next: NextFunction) {
    const userId = req.user.id;

    try {
      const quizzesSummary = await this.takeService.getQuizzesSummary(userId);
      res.status(HttpCode.OK).send(quizzesSummary);
    } catch (e) {
      next(e);
    }
  }
}

export default TakeController;
