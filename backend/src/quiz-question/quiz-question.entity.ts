import { AbstractEntity } from '../abstract/abstract-entity';
import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { Quiz } from '../quiz/quiz.entity';
import { QuizAnswer } from '../quiz-answer/quiz-answer.entity';

enum QuestionTypes {
  SINGLE_CHOICE = 'single-choice',
  MULTIPLE_CHOICE = 'multiple-choice',
  SELECT = 'select',
  INPUT = 'input',
}

@Entity()
export class QuizQuestion extends AbstractEntity {
  @Column()
  active: string;

  @Column()
  score: number;

  @Column()
  content: string;

  @Column({ type: 'enum', enum: QuestionTypes })
  type: QuestionTypes;

  @ManyToOne(() => Quiz, (quiz) => quiz.question)
  quiz: Quiz;

  @OneToMany(() => QuizAnswer, (quizAnswer) => quizAnswer.question, { onDelete: 'CASCADE' })
  answer: QuizAnswer[];
}
