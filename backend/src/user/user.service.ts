import { getRepository } from 'typeorm';
import User from './user.entity';

class UserService {
  private userRepository = getRepository(User);

  public async getAll() {
    return await this.userRepository.find();
  }
}

export default UserService;
