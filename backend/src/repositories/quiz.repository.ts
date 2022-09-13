import { EntityRepository, Repository } from 'typeorm';
import { Quiz } from '../quiz/quiz.entity';

@EntityRepository(Quiz)
class QuizRepository extends Repository<Quiz> {}

export default QuizRepository;
