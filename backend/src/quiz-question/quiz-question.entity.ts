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

  @ManyToOne((type) => Quiz, (quiz) => quiz.question)
  quiz: Quiz[];

  @OneToMany((type) => QuizAnswer, (quizAnswer) => quizAnswer.question)
  answer: QuizAnswer;
  // answer
}
