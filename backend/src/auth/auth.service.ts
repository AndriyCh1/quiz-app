import * as bcrypt from 'bcrypt';
import UserDto from "../user/dto/user.dto";
import User from "../user/user.entity";
import {IDataInToken} from "../common/interfaces";
import UserWithThatEmailExistException from "../exceptions/UserWithThatEmailExistException";
import WrongCredentialsException from "../exceptions/WrongCredationalsException.exception";
import TokenService from "../token/token-service";
import { getRepository } from "typeorm";

class AuthService {
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

    return { ...tokens, user: newUser};
  }

  public async login(userData: UserDto) {
    const user = await this.userRepository.findOne({
      email: userData.email,
    });
    
    if (user) {
      const doesPasswordMatching = await bcrypt.compare(userData.password, user.password)

      if (doesPasswordMatching) {
        user.password = undefined;

        const tokens = this.tokenService.generateTokens({id: user.id, email: user.email });

        await this.tokenService.saveToken(user.id, tokens.refreshToken);
        return {...tokens, user: userData}
      }
      throw new WrongCredentialsException();
    }
    throw new WrongCredentialsException();
  }

  public async logout(refreshToken: string) {
    const token = await this.tokenService.removeToken(refreshToken);
    return token;
  }

  public async refresh(refreshToken: string) {
    if(!refreshToken) {
      throw new WrongCredentialsException();
    }

    const userData = this.tokenService.validateRefreshToken(refreshToken) as IDataInToken;
    const tokenFromDB = this.tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDB) {
      throw new WrongCredentialsException();
    }

    const user = await this.userRepository.findOne({id: userData.id});
    const tokens = this.tokenService.generateTokens({...user});

    await this.tokenService.saveToken(user.id, tokens.refreshToken);
    return {...tokens, user}
  }
}

export default AuthService;
