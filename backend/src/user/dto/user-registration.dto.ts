import { IsString } from 'class-validator';

class UserRegistrationDto {
  @IsString()
  public email: string;

  @IsString()
  public fullName?: string;

  @IsString()
  public password: string;

  public avatar?: Express.Multer.File;
}

export default UserRegistrationDto;
