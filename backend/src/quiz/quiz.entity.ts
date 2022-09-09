import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from '../abstract/abstract-entity';
import { User } from '../user/user.entity';
import { QuizQuestion } from '../quiz-question/quiz-question.entity';

enum QuizTypes {
  DIFFERENT = 'different',
  SINGLE_CHOICE = 'single-choice',
  MULTIPLE_CHOICE = 'multiple-choice',
  SELECT = 'select',
  INPUT = 'input',
}

@Entity()
export class Quiz extends AbstractEntity {
  @Column()
  active: boolean;

  @Column({ type: 'enum', enum: QuizTypes })
  type: QuizTypes;

  @Column()
  score: number;

  @Column()
  content: string;

  @Column()
  time: number;

  @ManyToOne((type) => User, (user) => user.quiz)
  user: User[];

  @OneToMany((type) => QuizQuestion, (quizQuestion) => quizQuestion.quiz)
  question: QuizQuestion;
}
