import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import UserDto from "../user/user.dto";
import User from "../user/user.entity";
import {IDataInToken} from "../interfaces/dataInToken.inteface";
import {ITokenData} from "../interfaces/tokenData.interface";
import UserWithThatEmailExistException from "../exceptions/UserWithThatEmailExistException";
import WrongCredationalsException from "../exceptions/WrongCredationalsException.exception";
import TokenService from "../token/token-service";
import { getRepository } from "typeorm";

class AuthService {

  constructor(){}
  
  private userRepository = getRepository(User);
  private tokenService = new TokenService();

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

    const tokens = this.tokenService.generateTokens({id: newUser.id, email: newUser.email });
    await this.tokenService.saveToken(newUser.id, tokens.refreshToken);

    // const cookie = this.createCookie({token: tokens.refreshToken, expiresIn: 30 * 24 * 60 * 60 * 1000});

    return { ...tokens, user: newUser};
  }

  public async login(userData: UserDto) {
    const user = await this.userRepository.findOne({
      email: userData.email,
    });
    
    if (user) {
      const doesPasswordMatching = await bcrypt.compare(userData.password, user.password)

      if (doesPasswordMatching) {
        const token = this.createToken(user);
        // const cookie = this.createCookie(token)
        user.password = undefined;

        const tokens = this.tokenService.generateTokens({id: user.id, email: user.email });

        await this.tokenService.saveToken(user.id, tokens.refreshToken);
        return {...tokens, user: userData}
      }
      throw new WrongCredationalsException();
    }
    throw new WrongCredationalsException();
  }

  public async logout (refreshToken: string) {
    const token = await this.tokenService.removeToken(refreshToken);
    return token;
  }

  private createToken(user: User ): ITokenData {
    const expiresIn = 60 * 60; // an hour
    const secret = process.env.JWT_SECRET;

    const payload: IDataInToken = {
      id: user.id,
    }

    const jwtToken: ITokenData = { expiresIn, token: jwt.sign(payload, secret, { expiresIn }) }

    return jwtToken;
  }

  public async refresh (refreshToken: string) {
    if(!refreshToken) {
      throw new WrongCredationalsException();
    }

    const userData = this.tokenService.validateRefreshToken(refreshToken) as IDataInToken;
    const tokenFromDB = this.tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDB) {
      throw new WrongCredationalsException();
    }

    const user = await this.userRepository.findOne({id: userData.id});
    const tokens = await this.tokenService.generateTokens({...user});

    await this.tokenService.saveToken(user.id, tokens.refreshToken);
    return {...tokens, user}
  }

  private createCookie(token: ITokenData): string {
    return `Authorization=${token.token}; HttpOnly; Max-Age=${token.expiresIn}`
  }
}

export default AuthService;
