import { NextFunction, Request, Response, Router } from 'express';

import { IController } from '../common/interfaces';

import authMiddleware from '../middlewares/authMiddleware';
import validationMiddleware from '../middlewares/validation.middleware';

import AnswerDto from './dto/quiz-answer.dto';
import QuizAnswerService from './quiz-answer.service';

class QuizAnswerController implements IController {
  public path = '/answer';
  public router = Router();

  constructor(private readonly answerService: QuizAnswerService) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use(authMiddleware);
    this.router.get(`${this.path}/:id`, this.getAnswerById.bind(this));
    this.router.get(`${this.path}/question/:questionId`, this.getAllQuestionAnswers.bind(this));
    this.router.post(
      `${this.path}/question/:questionId`,
      validationMiddleware(AnswerDto),
      this.createQuestionAnswer.bind(this),
    );
    this.router.put(`${this.path}/:id`, this.updateAnswer.bind(this));
    this.router.delete(`${this.path}/:id`, this.deleteAnswer.bind(this));
  }

  private async getAnswerById(req: Request, res: Response, next: NextFunction) {
    try {
      const answerId: string = req.params.id as unknown as string;
      const answer = await this.answerService.getById(answerId);
      res.send(answer);
    } catch (e) {
      next(e);
    }
  }

  private async getAllQuestionAnswers(req: Request, res: Response, next: NextFunction) {
    try {
      const questionId: string = req.params.questionId as unknown as string;
      const answers = await this.answerService.getAllByQuestionId(questionId);
      res.send(answers);
    } catch (e) {
      next(e);
    }
  }

  private async createQuestionAnswer(req: Request, res: Response, next: NextFunction) {
    try {
      const questionId: string = req.params.questionId as unknown as string;
      const answerData: AnswerDto = req.body as unknown as AnswerDto;
      const answer = await this.answerService.create(questionId, answerData);
      res.send(answer);
    } catch (e) {
      next(e);
    }
  }

  private async updateAnswer(req: Request, res: Response, next: NextFunction) {
    try {
      const answerId: string = req.params.id as unknown as string;
      const answerData: AnswerDto = req.body as unknown as AnswerDto;
      const answer = await this.answerService.update(answerId, answerData);
      res.send(answer);
    } catch (e) {
      next(e);
    }
  }

  private async deleteAnswer(req: Request, res: Response, next: NextFunction) {
    try {
      const answerId: string = req.params.id as unknown as string;
      const answer = await this.answerService.delete(answerId);
      res.send(answer);
    } catch (e) {
      next(e);
    }
  }
}

export default QuizAnswerController;
