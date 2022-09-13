import { getCustomRepository, getRepository } from 'typeorm';

import QuizDto from './dto/quiz.dto';
import { HttpCode } from '../common/enums';
import { IDeepQuiz } from '../common/interfaces';

import HttpException from '../exceptions/HttpException';

import { Quiz } from './quiz.entity';
import { User } from '../user/user.entity';

import UserRepository from '../repositories/user.repository';
import QuizQuestionRepository from '../repositories/quiz-question.repository';
import QuizAnswerRepository from '../repositories/quiz-answer.repository';

class QuizService {
  private quizRepository = getRepository(Quiz);

  public async getById(id: Quiz['id']): Promise<Quiz> {
    const quiz = await this.quizRepository.findOne(id);

    if (!quiz) {
      throw new HttpException(HttpCode.NOT_FOUND, 'Quiz not found');
    }

    return quiz;
  }

  public async getDeepById(id: Quiz['id'], userId: User['id']): Promise<IDeepQuiz> {
    const quiz = await this.quizRepository
      .createQueryBuilder('quiz')
      .leftJoin('quiz.user', 'user')
      .addSelect('user.fullName')
      .leftJoinAndSelect('quiz.questions', 'questions')
      .leftJoinAndSelect('questions.answers', 'answers')
      .where('(quiz.published = true OR user.id = :userId) AND quiz.id = :quizId', {
        userId,
        quizId: id,
      })
      .getOne();

    if (!quiz) {
      throw new HttpException(HttpCode.NOT_FOUND, 'Quiz not found');
    }

    return quiz;
  }

  public async getPublicDeepById(id: Quiz['id']): Promise<IDeepQuiz> {
    const quiz = await this.quizRepository
      .createQueryBuilder('quiz')
      .where('quiz.published = true')
      .leftJoin('quiz.user', 'user')
      .addSelect('user.fullName')
      .leftJoinAndSelect('quiz.questions', 'questions')
      .leftJoinAndSelect('questions.answers', 'answers')
      .andWhere('quiz.id = :id', { id })
      .getOne();

    if (!quiz) {
      throw new HttpException(HttpCode.NOT_FOUND, 'Quiz not found');
    }

    return quiz;
  }

  public async getAll(userId: User['id']): Promise<Quiz[]> {
    return await this.quizRepository
      .createQueryBuilder('quiz')
      .leftJoinAndSelect('quiz.questions', 'questions')
      .leftJoinAndSelect('quiz.user', 'user')
      .where('quiz.published = true')
      .orWhere('user.id = :id', { id: userId })
      .getMany();
  }

  public async getPublic(): Promise<Quiz[]> {
    return await this.quizRepository
      .createQueryBuilder('quiz')
      .leftJoinAndSelect('quiz.questions', 'questions')
      .where('quiz.published = true')
      .getMany();
  }

  public async create(userId: User['id'], quizData: QuizDto): Promise<Quiz> {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findOne(userId);

    const quiz = await this.quizRepository.create({ ...quizData, user }).save();
    return quiz;
  }

  public async createDeep(userId: User['id'], quizData: IDeepQuiz): Promise<Quiz> {
    const userRepository = getCustomRepository(UserRepository);
    const questionRepository = getCustomRepository(QuizQuestionRepository);
    const answerRepository = getCustomRepository(QuizAnswerRepository);

    const user = await userRepository.findOne(userId);

    if (!user) {
      throw new HttpException(HttpCode.NOT_FOUND, 'Such user not found');
    }

    const quiz = await this.quizRepository.create({ ...quizData, user }).save();

    if (!quiz) {
      throw new HttpException(HttpCode.INTERNAL_SERVER_ERROR, 'Quiz wasn`t created');
    }

    for await (const question of quizData.questions) {
      const createdQuestion = await questionRepository.create({ ...question, quiz }).save();

      if (!createdQuestion) {
        throw new HttpException(HttpCode.INTERNAL_SERVER_ERROR, 'Some question wasn`t created');
      }

      for await (const answer of question.answers) {
        const createdAnswer = await answerRepository
          .create({ ...answer, question: createdQuestion })
          .save();

        if (!createdAnswer) {
          throw new HttpException(HttpCode.INTERNAL_SERVER_ERROR, 'Some answer wasn`t created');
        }
      }
    }

    const createdQuiz = await this.quizRepository
      .createQueryBuilder('quiz')
      .leftJoin('quiz.user', 'user')
      .addSelect('user.fullName')
      .leftJoinAndSelect('quiz.questions', 'questions')
      .leftJoinAndSelect('questions.answers', 'answers')
      .where('quiz.id = :id', { id: quiz.id })
      .getOne();

    if (!createdQuiz) {
      throw new HttpException(HttpCode.INTERNAL_SERVER_ERROR, 'Cannot create quiz');
    }

    return createdQuiz;
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
