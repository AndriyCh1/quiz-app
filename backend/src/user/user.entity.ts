import { Column, Entity, OneToMany } from 'typeorm';
import { Quiz } from '../quiz/quiz.entity';
import { AbstractEntity } from '../abstract/abstract-entity';
import { Take } from '../take/take.entity';

@Entity()
export class User extends AbstractEntity {
  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  fullName: string;

  @Column({ nullable: true })
  avatar: string;

  @OneToMany(() => Quiz, (quiz) => quiz.user)
  quiz: Quiz;

  @OneToMany(() => Take, (take) => take.user)
  takes: Take[];
}
