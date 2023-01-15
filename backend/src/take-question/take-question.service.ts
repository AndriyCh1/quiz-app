import { getRepository } from 'typeorm';
import { TakeQuestion } from './take-question.entity';
import { TakeAnswer } from '../take-asnwer/take-answer.entity';
import HttpException from '../exceptions/HttpException';
import { ICreateTakeQuestion } from '../common/interfaces';
import { HttpCode } from '../common/enums';
import UpdateQuestionDto from './dto/update-question.dto';

class TakeQuestionService {
  private takeQuestionRepository = getRepository(TakeQuestion);

  public async getOne(id: TakeQuestion['id']): Promise<TakeQuestion> {
    return await this.takeQuestionRepository.findOne(id);
  }

  public async create(data: ICreateTakeQuestion): Promise<TakeQuestion> {
    const newQuestionInstance = this.takeQuestionRepository.create(data);

    return await this.takeQuestionRepository.save(newQuestionInstance);
  }

  public async update(id: TakeQuestion['id'], data: UpdateQuestionDto): Promise<TakeQuestion> {
    await this.takeQuestionRepository
      .createQueryBuilder('question')
      .update(TakeQuestion)
      .set(data)
      .where('id = :id', { id })
      .execute();

    return await this.takeQuestionRepository.findOne({ id });
  }

  public async getAnswers(id: TakeQuestion['id']): Promise<TakeAnswer[]> {
    const question = await this.takeQuestionRepository
      .createQueryBuilder('question')
      .leftJoinAndSelect('question.answers', 'answers')
      .where('question.id = :questionId', { questionId: id })
      .getOne();

    if (!question) {
      throw new HttpException(HttpCode.NOT_FOUND, `Question with id ${id} was not found`);
    }

    return question.answers;
  }
}

export default TakeQuestionService;
