import { IsOptional, IsString } from "class-validator";

class LogInDto {
  @IsString()
  public email: string;

  @IsString()
  public password: string;

  // TODO: login form doesn`t have fullName
  @IsString()
  @IsOptional()
  public fullName?: string;
}

export default LogInDto;