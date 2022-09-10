import { getRepository } from 'typeorm';

import { HttpCode } from '../common/enums';
import QuestionDto from './dto/quiz-question.dto';
import HttpException from '../exceptions/HttpException';

import { Quiz } from '../quiz/quiz.entity';
import { QuizQuestion } from './quiz-question.entity';

import QuizService from '../quiz/quiz.service';
import quizQuestionDto from './dto/quiz-question.dto';

class QuizQuestionService {
  private questionRepository = getRepository(QuizQuestion);
  private quizService = new QuizService();

  // TODO: check current user permissions for data changing

  public async getById(id: QuizQuestion['id']): Promise<QuizQuestion> {
    const question = await this.questionRepository.findOne(id);

    if (!question) {
      throw new HttpException(HttpCode.NOT_FOUND, 'Question not found');
    }

    return question;
  }

  public async getAllByQuizId(quizId: Quiz['id']): Promise<QuizQuestion[]> {
    const quiz = await this.quizService.getById(quizId);

    if (!quiz) {
      throw new HttpException(HttpCode.NOT_FOUND, 'Quiz does not exist');
    }

    return await this.questionRepository.find({ quiz });
    // return await this.questionRepository.find({ relations: ['quiz'], where: { quiz: quizId } });
  }

  public async create(quizId: Quiz['id'], questionData: QuestionDto): Promise<QuizQuestion> {
    const quiz = await this.quizService.getById(quizId);

    if (!quiz) {
      throw new HttpException(
        HttpCode.NOT_FOUND,
        'Question cannot be created for a quiz that does not exist',
      );
    }
    const question = await this.questionRepository.create({ ...questionData, quiz }).save();
    return question;
  }

  public async update(
    id: QuizQuestion['id'],
    questionData: quizQuestionDto,
  ): Promise<QuizQuestion> {
    const question = await this.questionRepository.findOne(id);

    if (!question) {
      throw new HttpException(HttpCode.NOT_FOUND, 'Question not found');
    }

    await this.questionRepository.update(question.id, questionData);

    return await this.questionRepository.findOne(id);
  }

  public async delete(id: QuizQuestion['id']): Promise<QuizQuestion> {
    const question = await this.questionRepository.findOne(id);

    if (!question) {
      throw new HttpException(HttpCode.NOT_FOUND, 'Question not found');
    }
    return await question.remove();
  }
}

export default QuizQuestionService;
