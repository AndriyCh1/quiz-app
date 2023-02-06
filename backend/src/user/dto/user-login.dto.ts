import { IsString } from 'class-validator';

class UserLoginDto {
  @IsString()
  public email: string;

  @IsString()
  public password: string;
}

export default UserLoginDto;
