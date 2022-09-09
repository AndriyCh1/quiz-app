import { Column, Entity, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { AbstractEntity } from '../abstract/abstract-entity';

@Entity()
export class Token extends AbstractEntity {
  @Column()
  refreshToken: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
