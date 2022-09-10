import { AbstractEntity } from '../abstract/abstract-entity';
import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { Quiz } from '../quiz/quiz.entity';
import { QuizAnswer } from '../quiz-answer/quiz-answer.entity';
import { QuestionTypes } from '../common/enums';

@Entity()
export class QuizQuestion extends AbstractEntity {
  @Column()
  active: string;

  @Column()
  score: number;

  @Column()
  content: string;

  @Column({ type: 'enum', enum: QuestionTypes })
  type: string;

  @ManyToOne(() => Quiz, (quiz) => quiz.questions)
  quiz: Quiz;

  @OneToMany(() => QuizAnswer, (quizAnswer) => quizAnswer.question, { onDelete: 'CASCADE' })
  answers: QuizAnswer[];
}
