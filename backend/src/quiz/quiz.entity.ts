import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from '../abstract/abstract-entity';
import { User } from '../user/user.entity';
import { QuizQuestion } from '../quiz-question/quiz-question.entity';
import { QuizTypes } from '../common/enums';

@Entity()
export class Quiz extends AbstractEntity {
  @Column()
  title: string;

  @Column({ default: false })
  published: boolean;

  @Column({ type: 'enum', enum: QuizTypes })
  type: string;

  @Column()
  score: number;

  @Column()
  content: string;

  @Column()
  time: number;

  @ManyToOne(() => User, (user) => user.quiz, { onDelete: 'CASCADE' })
  user: User;

  @OneToMany(() => QuizQuestion, (quizQuestion) => quizQuestion.quiz, { onDelete: 'CASCADE' })
  questions: QuizQuestion[];
}
