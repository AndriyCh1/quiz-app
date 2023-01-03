import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../abstract/abstract-entity';
import { TakeQuestion } from '../take-question/take-question.entity';

@Entity()
export class TakeAnswer extends AbstractEntity {
  @Column()
  content: string;

  @Column({ default: false })
  chosen: boolean;

  @Column({ default: false })
  correct: boolean;

  @ManyToOne(() => TakeQuestion, (question) => question.answers, { onDelete: 'CASCADE' })
  question: TakeQuestion;
}
