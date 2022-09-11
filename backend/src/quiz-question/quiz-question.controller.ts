import { IController } from '../common/interfaces';
import { NextFunction, Request, Response, Router } from 'express';
import QuizQuestionService from './quiz-question.service';
import authMiddleware from '../middlewares/authMiddleware';
import QuestionDto from './dto/quiz-question.dto';
import validationMiddleware from '../middlewares/validation.middleware';

class QuizQuestionController implements IController {
  public path = '/question';
  public router = Router();

  constructor(private readonly questionService: QuizQuestionService) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use(authMiddleware);
    this.router.get(`${this.path}/:id`, this.getQuestionById.bind(this));
    this.router.get(`${this.path}/quizzes/:quizId`, this.getAllQuizQuestions.bind(this));
    this.router.post(
      `${this.path}/quizzes/:quizId`,
      validationMiddleware(QuestionDto),
      this.createQuizQuestion.bind(this),
    );
    this.router.put(`${this.path}/:id`, this.updateQuestion.bind(this));
    this.router.delete(`${this.path}/:id`, this.deleteQuestion.bind(this));
  }

  private async getQuestionById(req: Request, res: Response, next: NextFunction) {
    try {
      const questionId: string = req.params.id as unknown as string;
      const question = await this.questionService.getById(questionId);
      res.send(question);
    } catch (e) {
      next(e);
    }
  }

  private async getAllQuizQuestions(req: Request, res: Response, next: NextFunction) {
    try {
      const quizId: string = req.params.quizId as unknown as string;
      const question = await this.questionService.getAllByQuizId(quizId);
      res.send(question);
    } catch (e) {
      next(e);
    }
  }

  private async createQuizQuestion(req: Request, res: Response, next: NextFunction) {
    try {
      const quizId: string = req.params.quizId as unknown as string;
      const questionData: QuestionDto = req.body as unknown as QuestionDto;
      const question = await this.questionService.create(quizId, questionData);
      res.send(question);
    } catch (e) {
      next(e);
    }
  }

  private async updateQuestion(req: Request, res: Response, next: NextFunction) {
    try {
      const questionId: string = req.params.id as unknown as string;
      const questionData: QuestionDto = req.body as unknown as QuestionDto;
      const question = await this.questionService.update(questionId, questionData);
      res.send(question);
    } catch (e) {
      next(e);
    }
  }

  private async deleteQuestion(req: Request, res: Response, next: NextFunction) {
    try {
      const questionId: string = req.params.id as unknown as string;
      const question = await this.questionService.delete(questionId);
      res.send(question);
    } catch (e) {
      next(e);
    }
  }
}

export default QuizQuestionController;
