import { getCustomRepository, getRepository } from 'typeorm';

import QuizDto from './dto/quiz.dto';
import { HttpCode } from '../common/enums';
import { IAnswer, IDeepQuiz } from '../common/interfaces';

import HttpException from '../exceptions/HttpException';

import { Quiz } from './quiz.entity';
import { User } from '../user/user.entity';

import UserRepository from '../repositories/user.repository';
import QuizQuestionRepository from '../repositories/quiz-question.repository';
import QuizAnswerRepository from '../repositories/quiz-answer.repository';
import {
  IDeepUpdateQuiz,
  IQuestion,
  IQuiz,
  IUpdateAnswer,
} from '../common/interfaces/quizzes.interface';
import { QuizAnswer } from '../quiz-answer/quiz-answer.entity';

class QuizService {
  private quizRepository = getRepository(Quiz);

  public async getById(id: Quiz['id']): Promise<Quiz> {
    const quiz = await this.quizRepository.findOne(id);

    if (!quiz) {
      throw new HttpException(HttpCode.NOT_FOUND, 'Quiz not found');
    }

    return quiz;
  }

  public async getDeepById(id: string, userId: string | undefined): Promise<IDeepQuiz> {
    let quiz;
    const isAuthenticated = !!userId;

    quiz = await this.quizRepository
      .createQueryBuilder('quiz')
      .leftJoin('quiz.user', 'user')
      .addSelect(['user.id', 'user.fullName', 'user.avatar'])
      .leftJoinAndSelect('quiz.questions', 'questions')
      .leftJoinAndSelect('questions.answers', 'answers')
      .andWhere('quiz.id = :id', { id })
      .getOne();

    if (!quiz) {
      throw new HttpException(HttpCode.NOT_FOUND, 'Quiz not found');
    }

    if (!isAuthenticated && quiz.published === false) {
      throw new HttpException(HttpCode.NOT_FOUND, 'Quiz not found');
    }

    if (quiz.user.id !== userId) {
      quiz = this.hideCorrectAnswers(quiz);
    }

    return quiz;
  }

  public async getAll(userId: string | undefined): Promise<Quiz[]> {
    let queryBuilder = this.quizRepository
      .createQueryBuilder('quiz')
      .leftJoinAndSelect('quiz.questions', 'questions')
      .leftJoinAndSelect('quiz.user', 'user')
      .where('quiz.published = true');

    if (userId) {
      queryBuilder = queryBuilder.orWhere('user.id = :id', { id: userId });
    }

    const quizzes = await queryBuilder.getMany();

    return quizzes;
  }

  public async create(userId: User['id'], quizData: QuizDto): Promise<Quiz> {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findOne(userId);

    return await this.quizRepository.create({ ...quizData, user }).save();
  }

  public async createDeep(userId: User['id'], quizData: IDeepQuiz): Promise<IDeepQuiz> {
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

    let createdQuiz: IDeepQuiz = await this.quizRepository
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

    createdQuiz = this.hideCorrectAnswers(createdQuiz);
    return createdQuiz;
  }

  public async delete(id: Quiz['id']): Promise<void> {
    const quiz = await this.quizRepository.findOne({ id });

    if (!quiz) {
      throw new HttpException(HttpCode.NOT_FOUND, 'Quiz not found');
    }

    await this.quizRepository.delete({ id });
  }

  public async update(id: Quiz['id'], quizData: QuizDto): Promise<Quiz> {
    const quiz = await this.quizRepository.findOne(id);

    if (!quiz) {
      throw new HttpException(HttpCode.NOT_FOUND, 'Quiz not found');
    }

    await this.quizRepository.update(quiz.id, quizData);

    return await this.quizRepository.findOne(id);
  }

  private async updateQuizById(id: Quiz['id'], quizData: IQuiz): Promise<void> {
    const quiz = await this.quizRepository.findOne(id);

    if (!quiz) {
      throw new HttpException(HttpCode.NOT_FOUND, 'Quiz not found');
    }

    await this.quizRepository.update(
      { id },
      {
        published: quizData.published,
        title: quizData.title,
        content: quizData.content,
        score: quizData.score,
        time: quizData.time,
      },
    );
  }

  private async updateQuestionById(id: string, questionData: IQuestion): Promise<void> {
    const questionRepository = getCustomRepository(QuizQuestionRepository);

    const question = await questionRepository.findOne(id);

    if (!question) {
      throw new HttpException(HttpCode.NOT_FOUND, 'Question not found');
    }

    await questionRepository.update(
      { id: questionData.id },
      {
        active: questionData.active,
        score: questionData.score,
        content: questionData.content,
        type: questionData.type,
      },
    );
  }

  private async updateAnswerById(id: string, answerData: IAnswer): Promise<void> {
    const answerRepository = getCustomRepository(QuizAnswerRepository);

    const answer = await answerRepository.findOne(id);

    if (!answer) {
      throw new HttpException(HttpCode.NOT_FOUND, 'Answer not found');
    }

    await answerRepository.update(
      { id },
      {
        active: answerData.active,
        content: answerData.content,
        correct: answerData.correct,
      },
    );
  }

  private async updateDeepAnswer(
    questionId: IQuestion['id'],
    answerData: IUpdateAnswer,
  ): Promise<void> {
    const answerRepository = getCustomRepository(QuizAnswerRepository);
    const questionRepository = getCustomRepository(QuizQuestionRepository);

    switch (answerData?.queryConfig.status) {
      case 'edited': {
        await this.updateAnswerById(answerData.id, answerData);
        break;
      }
      case 'new': {
        const foundQuestion = await questionRepository.findOne({ id: questionId });

        const createdAnswer = await answerRepository
          .create({
            correct: answerData.correct,
            active: answerData.active,
            content: answerData.content,
            question: foundQuestion,
          })
          .save();

        if (!createdAnswer) {
          throw new HttpException(HttpCode.INTERNAL_SERVER_ERROR, 'Some answer wasn`t created');
        }
        break;
      }
      case 'deleted': {
        await answerRepository.delete({ id: answerData.id });
        break;
      }
      default: {
        break;
      }
    }
  }

  public async updateDeep(id: Quiz['id'], quizData: IDeepUpdateQuiz): Promise<void> {
    const quiz = await this.quizRepository.findOne(id);

    const questionRepository = getCustomRepository(QuizQuestionRepository);

    await this.updateQuizById(id, quizData);

    for await (const question of quizData.questions) {
      switch (question?.queryConfig.status) {
        case 'edited': {
          await this.updateQuestionById(question.id, question);

          for await (const answer of question.answers) {
            await this.updateDeepAnswer(question.id, answer);
          }

          break;
        }
        case 'new': {
          const createdQuestion = await questionRepository
            .create({
              quiz,
              content: question.content,
              type: question.type,
              score: question.score,
              active: question.active,
            })
            .save();

          if (!createdQuestion) {
            throw new HttpException(HttpCode.INTERNAL_SERVER_ERROR, 'Some question wasn`t created');
          }

          for await (const answer of question.answers) {
            await this.updateDeepAnswer(createdQuestion.id, answer);
          }

          break;
        }
        case 'deleted': {
          await questionRepository.delete({ id: question.id });
          break;
        }
        default: {
          break;
        }
      }
    }
  }

  public hideCorrectAnswers(quiz: IDeepQuiz): IDeepQuiz {
    return {
      ...quiz,
      questions: [
        ...quiz.questions.map((question) => ({
          ...question,
          answers: [...question.answers.map((answer) => ({ ...answer, correct: undefined }))],
        })),
      ],
    };
  }

  public async checkIfAnswerCorrect(
    quizId: Quiz['id'],
    answerId: QuizAnswer['id'],
  ): Promise<boolean> {
    const isQuizPublic = await this.quizRepository.findOne({ id: quizId });

    if (isQuizPublic.published === false) {
      throw new HttpException(
        HttpCode.FORBIDDEN,
        'You don`t have permission for this action, quiz has to be public',
      );
    }

    const answerRepository = getRepository(QuizAnswer);

    const { correct } = await answerRepository.findOne({ id: answerId }, { select: ['correct'] });

    return correct;
  }
}

export default QuizService;
