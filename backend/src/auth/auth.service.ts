import bcrypt from 'bcrypt';
import AWS from 'aws-sdk';
import { getRepository } from 'typeorm';

import { User } from '../user/user.entity';
import { IDataInToken } from '../common/interfaces';
import UserWithThatEmailExistException from '../exceptions/UserWithThatEmailExistException';
import WrongCredentialsException from '../exceptions/WrongCredationalsException.exception';
import UserLoginDto from '../user/dto/user-login.dto';
import UserRegistrationDto from '../user/dto/user-registration.dto';

import TokenService from '../token/token-service';
import AwsS3Service from '../file-upload/aws-s3.service';

class AuthService {
  private userRepository = getRepository(User);

  constructor(
    private readonly tokenService: TokenService,
    private readonly awsFileService: AwsS3Service,
  ) {}

  public async register(userData: UserRegistrationDto) {
    const user = await this.userRepository.findOne({ email: userData.email });

    if (user) {
      throw new UserWithThatEmailExistException(userData.email);
    }

    const hashedPassword = await bcrypt.hash(userData.password, 7);

    let uploadingAvatarResult: AWS.S3.ManagedUpload.SendData | undefined;

    if (userData?.avatar) {
      uploadingAvatarResult = await this.awsFileService.uploadObject(userData.avatar);
    }

    const newUserInstance = await this.userRepository.create({
      ...userData,
      password: hashedPassword,
      avatar: uploadingAvatarResult?.Location || null,
    });

    console.log(uploadingAvatarResult?.Location, 'uploadingAvatarResult?.Location');
    const createdUser = await this.userRepository.save(newUserInstance);

    createdUser.password = undefined;

    const tokens = this.tokenService.generateTokens({
      id: createdUser.id,
      email: createdUser.email,
    });

    await this.tokenService.saveToken(createdUser.id, tokens.refreshToken);

    return { ...tokens, user: createdUser };
  }

  public async login(userData: UserLoginDto) {
    const user = await this.userRepository.findOne({
      email: userData.email,
    });

    if (user) {
      const doesPasswordMatching = await bcrypt.compare(userData.password, user.password);

      if (doesPasswordMatching) {
        user.password = undefined;

        const tokens = this.tokenService.generateTokens({ id: user.id, email: user.email });

        await this.tokenService.saveToken(user.id, tokens.refreshToken);
        return { ...tokens, user };
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
    if (!refreshToken) {
      throw new WrongCredentialsException();
    }

    const userData = this.tokenService.validateRefreshToken(refreshToken) as IDataInToken;
    const tokenFromDB = this.tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDB) {
      throw new WrongCredentialsException();
    }

    const user = await this.userRepository.findOne({ id: userData.id });
    const tokens = this.tokenService.generateTokens({ ...user });

    user.password = undefined;

    await this.tokenService.saveToken(user.id, tokens.refreshToken);
    return { ...tokens, user };
  }
}

export default AuthService;
