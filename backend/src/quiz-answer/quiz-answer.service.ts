import { getCustomRepository, getRepository } from 'typeorm';

import { HttpCode } from '../common/enums';
import HttpException from '../exceptions/HttpException';
import AnswerDto from './dto/quiz-answer.dto';

import { QuizAnswer } from './quiz-answer.entity';
import { QuizQuestion } from '../quiz-question/quiz-question.entity';

import QuizQuestionRepository from '../repositories/quiz-question.repository';

class QuizAnswerService {
  private answerRepository = getRepository(QuizAnswer);

  public async getById(id: QuizAnswer['id']): Promise<QuizAnswer> {
    const answer = await this.answerRepository.findOne(id);

    if (!answer) {
      throw new HttpException(HttpCode.NOT_FOUND, 'Answer not found');
    }

    return answer;
  }

  public async getAllByQuestionId(questionId: QuizQuestion['id']): Promise<QuizAnswer[]> {
    const questionRepository = getCustomRepository(QuizQuestionRepository);

    const question = await questionRepository.findOne(questionId);

    if (!question) {
      throw new HttpException(HttpCode.NOT_FOUND, 'Question does not exist');
    }

    return await this.answerRepository.find({ question });
  }

  public async create(
    questionId: QuizQuestion['id'],
    questionData: AnswerDto,
  ): Promise<QuizAnswer> {
    const questionRepository = getCustomRepository(QuizQuestionRepository);
    const question = await questionRepository.findOne(questionId);

    if (!question) {
      throw new HttpException(
        HttpCode.NOT_FOUND,
        'Answer cannot be created for a question that does not exist',
      );
    }
    const answer = await this.answerRepository.create({ ...questionData, question }).save();
    return answer;
  }

  public async update(id: QuizAnswer['id'], answerData: AnswerDto): Promise<QuizAnswer> {
    const answer = await this.answerRepository.findOne(id);

    if (!answer) {
      throw new HttpException(HttpCode.NOT_FOUND, 'Answer not found');
    }

    await this.answerRepository.update(answer.id, answerData);

    return await this.answerRepository.findOne(id);
  }

  public async delete(id: QuizAnswer['id']): Promise<void> {
    const answer = await this.answerRepository.findOne(id);

    if (!answer) {
      throw new HttpException(HttpCode.NOT_FOUND, 'Answer not found');
    }

    await answer.remove();
  }
}

export default QuizAnswerService;
