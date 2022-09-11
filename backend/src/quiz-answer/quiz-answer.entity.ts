import { AbstractEntity } from '../abstract/abstract-entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { QuizQuestion } from '../quiz-question/quiz-question.entity';

@Entity()
export class QuizAnswer extends AbstractEntity {
  @Column({ default: false })
  active: boolean;

  @Column()
  correct: boolean;

  @Column()
  content: string;

  @ManyToOne(() => QuizQuestion, (quizQuestion) => quizQuestion.answers)
  question: QuizQuestion;
}
