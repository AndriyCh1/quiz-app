import { AbstractEntity } from '../abstract/abstract-entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Quiz } from '../quiz/quiz.entity';
import { User } from '../user/user.entity';
import { TakeQuestion } from '../take-question/take-question.entity';

@Entity()
export class Take extends AbstractEntity {
  @Column({ nullable: true })
  status: string;

  @Column()
  currentScore: number;

  @Column()
  totalScore: number;

  @ManyToOne(() => Quiz, (quiz) => quiz.takes, { onDelete: 'SET NULL', onUpdate: 'SET NULL' })
  quiz: Quiz;

  @ManyToOne(() => User, (user) => user.takes, { onDelete: 'CASCADE' })
  user: User;

  @OneToMany(() => TakeQuestion, (question) => question.take)
  questions: TakeQuestion[];
}
