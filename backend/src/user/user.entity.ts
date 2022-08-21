import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  public fullName: string;
}

export default User;
