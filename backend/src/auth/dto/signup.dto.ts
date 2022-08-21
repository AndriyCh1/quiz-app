import { IsString } from 'class-validator';

class SignupDto {
  @IsString()
  public email: string;

  @IsString()
  public password: string;

  @IsString()
  public fullName?: string;
}

export default SignupDto;
