import { EntityRepository, Repository } from 'typeorm';
import { QuizAnswer } from '../quiz-answer/quiz-answer.entity';

@EntityRepository(QuizAnswer)
class QuizAnswerRepository extends Repository<QuizAnswer> {}

export default QuizAnswerRepository;
