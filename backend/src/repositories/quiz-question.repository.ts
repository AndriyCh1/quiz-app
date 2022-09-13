import { EntityRepository, Repository } from 'typeorm';
import { QuizQuestion } from '../quiz-question/quiz-question.entity';

@EntityRepository(QuizQuestion)
class QuizQuestionRepository extends Repository<QuizQuestion> {}

export default QuizQuestionRepository;
