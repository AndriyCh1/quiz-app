import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from '../abstract/abstract-entity';
import { Take } from '../take/take.entity';
import { TakeAnswer } from '../take-asnwer/take-answer.entity';

@Entity()
export class TakeQuestion extends AbstractEntity {
  @Column()
  score: number;

  @Column()
  content: string;

  @Column()
  correctlyAnswered: boolean;

  @ManyToOne(() => Take, (take) => take.questions, { onDelete: 'CASCADE' })
  take: Take;

  @OneToMany(() => TakeAnswer, (answer) => answer.question)
  answers: TakeAnswer[];
}
