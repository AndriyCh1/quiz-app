import { EntityRepository, Repository } from 'typeorm';
import { User } from '../user/user.entity';

@EntityRepository(User)
class UserRepository extends Repository<User> {}

export default UserRepository;
