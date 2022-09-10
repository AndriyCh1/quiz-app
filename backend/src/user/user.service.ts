import { getRepository } from 'typeorm';
import { User } from './user.entity';
import HttpException from '../exceptions/HttpException';
import { HttpCode } from '../common/enums';

class UserService {
  private userRepository = getRepository(User);

  public async getAll() {
    return await this.userRepository.find();
  }

  public async getById(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new HttpException(HttpCode.NOT_FOUND, 'User not found');
    }

    return user;
  }
}

export default UserService;
