import {Column, Entity, OneToOne, JoinColumn, BaseEntity, PrimaryGeneratedColumn} from "typeorm";
import User from "../user/user.entity";

@Entity()
class Token extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    refreshToken: string;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;
}

export default Token;