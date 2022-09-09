import { Column, Entity, OneToMany } from 'typeorm';
import { Quiz } from '../quiz/quiz.entity';
import { AbstractEntity } from '../abstract/abstract-entity';

@Entity()
export class User extends AbstractEntity {
  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  public fullName: string;

  @OneToMany((type) => Quiz, (quiz) => quiz.user)
  quiz: Quiz;
}
