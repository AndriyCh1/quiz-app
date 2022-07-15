import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import UserDto from "../user/user.dto";
import User from "../user/user.entity";
import DataInToken from "../interfaces/dataInToken.inteface";
import TokenData from "../interfaces/tokenData.interface";
import UserWithThatEmailExistException from "../exceptions/UserWithThatEmailExistException";
import WrongCredationalsException from "../exceptions/WrongCredationalsException.exception";
import { getRepository } from "typeorm";

class AuthService {
  constructor(){}
  
  private userRepository = getRepository(User);

  public async register(userData: UserDto) {
    const user = await this.userRepository.findOne({email: userData.email})

    if (user) {
      throw new UserWithThatEmailExistException(userData.email)
    }

    const hashedPassword = await bcrypt.hash(userData.password, 7);

    const newUser = await this.userRepository.create({
      ...userData,
      password: hashedPassword,
    });

    await this.userRepository.save(newUser);

    newUser.password = undefined;

    const token = this.createToken(newUser);

    const cookie = this.createCookie(token);

    return {
      cookie,
      user: newUser
    }
  }

  public async login(userData: UserDto) {
    const user = await this.userRepository.findOne({
      email: userData.email,
    });
    
    if (user) {
      const doesPasswordMatching = await bcrypt.compare(userData.password, user.password)

      if (doesPasswordMatching) {
        const token = this.createToken(user);
        const cookie = this.createCookie(token)
        user.password = undefined;
  
        return {
          cookie,
          user
        }
      }
      throw new WrongCredationalsException();
    }
    throw new WrongCredationalsException();
  }

  private createToken(user: User ): TokenData {
    const expiresIn = 60 * 60; // an hour
    const secret = process.env.JWT_SECRET;

    const payload: DataInToken = {
      id: user.id,
    }

    const jwtToken: TokenData = { expiresIn, token: jwt.sign(payload, secret, { expiresIn }) }

    return jwtToken;
  }

  private createCookie(token: TokenData): string {
    return `Authorization=${token.token}; HttpOnly; Max-Age=${token.expiresIn}`
  }
}

export default AuthService;
