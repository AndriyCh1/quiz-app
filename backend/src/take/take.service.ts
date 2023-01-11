import { getRepository } from 'typeorm';
import { Take } from './take.entity';
import { User } from '../user/user.entity';
import { Quiz } from '../quiz/quiz.entity';
import { TakeQuestion } from '../take-question/take-question.entity';
import { TakeAnswer } from '../take-asnwer/take-answer.entity';

import QuizService from '../quiz/quiz.service';
import TakeQuestionService from '../take-question/take-question.service';
import TakeAnswerService from '../take-asnwer/take-answer.service';

import { ITakeDeepResponse } from '../common/interfaces';
import { TakeStatuses } from '../common/enums';
import UpdateTakeDto from './dto/update-take.dto';

class TakeService {
  private takeRepository = getRepository(Take);
  private userRepository = getRepository(User);

  constructor(
    private quizService: QuizService,
    private takeQuestionService: TakeQuestionService,
    private takeAnswerService: TakeAnswerService,
  ) {}

  public async getDeepTake(id: Take['id']): Promise<ITakeDeepResponse> {
    const deepTake = await this.takeRepository
      .createQueryBuilder('take')
      .leftJoinAndSelect('take.questions', 'question')
      .leftJoinAndSelect('question.answers', 'answer')
      .select([
        'take.content',
        'take.status',
        'take.currentScore',
        'take.totalScore',
        'take.content',
        'take.content',
        'question.content',
        'question.score',
        'question.answered',
        'question.correctlyAnswered',
        'answer.content',
        'answer.chosen',
      ])
      .where('take.id = :takeId', { takeId: id })
      .getOne();

    return deepTake;
  }

  public async findTakeByQuizId(quizId: Quiz['id']): Promise<Take> {
    return await this.takeRepository
      .createQueryBuilder('take')
      .where('take.quizId = :quizId', { quizId })
      .andWhere('take.status = :status', { status: TakeStatuses.STARTED })
      .getOne();
  }

  public async saveQuizAttempt(userId: User['id'], quizId: Quiz['id']): Promise<ITakeDeepResponse> {
    const startedTake = await this.findTakeByQuizId(quizId);

    if (startedTake) {
      return this.getDeepTake(startedTake.id);
    }

    const user = await this.userRepository.findOne({ id: userId });

    const quiz = await this.quizService.getDeepById(quizId, userId);

    const totalScore = quiz.questions.reduce((sum, question) => {
      return sum + question.score;
    }, 0);

    const createdTake = await this.takeRepository
      .create({
        content: quiz.content,
        status: TakeStatuses.STARTED,
        totalScore,
        quiz,
        user,
      })
      .save();

    for await (const question of quiz.questions) {
      const createdQuestion = await this.takeQuestionService.create({
        score: question.score,
        content: question.content,
        take: createdTake,
      });

      for await (const answer of question.answers) {
        await this.takeAnswerService.create({
          content: answer.content,
          correct: answer.correct,
          question: createdQuestion,
        });
      }
    }

    return await this.getDeepTake(createdTake.id);
  }

  public async update(id: Take['id'], data: UpdateTakeDto): Promise<Take> {
    await this.takeRepository
      .createQueryBuilder('take')
      .update(Take)
      .set(data)
      .where('id = :id', { id })
      .execute();

    return await this.takeRepository.findOne({ id });
  }

  public async saveAnswer(
    takeId: Take['id'],
    questionId: TakeQuestion['id'],
    answerId: TakeAnswer['id'],
  ): Promise<void> {
    const questionAnswers = await this.takeQuestionService.getAnswers(questionId);
    let previousAnswer = null;

    for await (const answer of questionAnswers) {
      if (answer.chosen) {
        previousAnswer = answer;
      }

      const isCurrentAnswerChosen = answer.id === answerId;
      await this.takeAnswerService.update(answer.id, { chosen: isCurrentAnswerChosen });
    }

    const updatedAnswer = await this.takeAnswerService.findOneById(answerId);

    const isCorrectlyAnswered = updatedAnswer.chosen && updatedAnswer.correct;
    const wasCorrectlyAnsweredBefore =
      previousAnswer && previousAnswer.chosen && previousAnswer.correct;

    const updatedQuestion = await this.takeQuestionService.update(questionId, {
      answered: true,
      correctlyAnswered: isCorrectlyAnswered,
    });

    const questionScore = updatedQuestion.score;
    const take = await this.takeRepository.findOne({ id: takeId });

    const newScore =
      isCorrectlyAnswered !== wasCorrectlyAnsweredBefore
        ? isCorrectlyAnswered
          ? take.currentScore + questionScore
          : take.currentScore - questionScore
        : take.currentScore;

    await this.update(takeId, { currentScore: newScore });
  }
}

export default TakeService;
