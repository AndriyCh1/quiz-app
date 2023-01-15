import { getRepository } from 'typeorm';
import { TakeAnswer } from './take-answer.entity';
import HttpException from '../exceptions/HttpException';
import { HttpCode } from '../common/enums';
import { ICreateTakeAnswer } from '../common/interfaces';
import UpdateAnswerDto from './dto/update-answer.dto';

class TakeAnswerService {
  private takeAnswerRepository = getRepository(TakeAnswer);

  constructor() {}

  public async create(data: ICreateTakeAnswer): Promise<TakeAnswer> {
    const newAnswerInstance = this.takeAnswerRepository.create(data);

    return await this.takeAnswerRepository.save(newAnswerInstance);
  }

  public async update(id: TakeAnswer['id'], data: UpdateAnswerDto): Promise<void> {
    await this.takeAnswerRepository
      .createQueryBuilder('answer')
      .update(TakeAnswer)
      .set(data)
      .where('id = :id', { id })
      .execute();
  }

  public async findOneById(id: TakeAnswer['id']): Promise<TakeAnswer> {
    const answer = await this.takeAnswerRepository.findOne({ id });

    if (!answer) {
      throw new HttpException(HttpCode.NOT_FOUND, `Answer with id ${id} was not found`);
    }

    return answer;
  }
}

export default TakeAnswerService;
