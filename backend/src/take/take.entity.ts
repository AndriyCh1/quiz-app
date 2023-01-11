import { AbstractEntity } from '../abstract/abstract-entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Quiz } from '../quiz/quiz.entity';
import { User } from '../user/user.entity';
import { TakeQuestion } from '../take-question/take-question.entity';
import { TakeStatuses } from '../common/enums/take-statuses.enum';

@Entity()
export class Take extends AbstractEntity {
  @Column()
  content: string;

  @Column({ nullable: true, enum: TakeStatuses })
  status: string;

  @Column({ default: 0 })
  currentScore: number;

  @Column({ nullable: true })
  totalScore: number;

  @ManyToOne(() => Quiz, (quiz) => quiz.takes, { onDelete: 'SET NULL', onUpdate: 'SET NULL' })
  quiz: Quiz;

  @ManyToOne(() => User, (user) => user.takes, { onDelete: 'CASCADE' })
  user: User;

  @OneToMany(() => TakeQuestion, (question) => question.take)
  questions: TakeQuestion[];
}
