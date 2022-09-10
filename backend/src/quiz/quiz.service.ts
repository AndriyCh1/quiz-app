import { getRepository } from 'typeorm';
import { Quiz } from './quiz.entity';
import QuizDto from './dto/quiz.dto';
import UserService from '../user/user.service';
import { User } from '../user/user.entity';
import HttpException from '../exceptions/HttpException';
import { HttpCode } from '../common/enums';
import { IDeepQuiz } from '../common/interfaces/quizzes.interface';

class QuizService {
  private quizRepository = getRepository(Quiz);
  private userService = new UserService();

  public async getById(id: Quiz['id']): Promise<Quiz> {
    const quiz = await this.quizRepository.findOne(id);

    if (!quiz) {
      throw new HttpException(HttpCode.NOT_FOUND, 'Quiz not found');
    }

    return quiz;
  }

  public async getDeepById(id: Quiz['id']): Promise<IDeepQuiz> {
    const quiz = await this.quizRepository
      .createQueryBuilder('quiz')
      .leftJoinAndSelect('quiz.questions', 'questions')
      .leftJoinAndSelect('questions.answers', 'answers')
      .where('quiz.id = :id', { id })
      .getOne();

    if (!quiz) {
      throw new HttpException(HttpCode.NOT_FOUND, 'Quiz not found');
    }

    return quiz;
  }

  public async getAll(): Promise<Quiz[]> {
    return await this.quizRepository
      .createQueryBuilder('quiz')
      .leftJoinAndSelect('quiz.questions', 'questions')
      .getMany();
  }

  public async create(userId: User['id'], quizData: QuizDto): Promise<Quiz> {
    const user = await this.userService.getById(userId);

    const quiz = await this.quizRepository.create({ ...quizData, user }).save();
    return quiz;
  }

  public async delete(id: Quiz['id']): Promise<Quiz> {
    const quiz = await this.quizRepository.findOne(id);

    if (!quiz) {
      throw new HttpException(HttpCode.NOT_FOUND, 'Quiz not found');
    }
    return await quiz.remove();
  }

  public async update(id: Quiz['id'], quizData: QuizDto): Promise<Quiz> {
    const quiz = await this.quizRepository.findOne(id);

    if (!quiz) {
      throw new HttpException(HttpCode.NOT_FOUND, 'Quiz not found');
    }

    await this.quizRepository.update(quiz.id, quizData);

    return await this.quizRepository.findOne(id);
  }
}

export default QuizService;
