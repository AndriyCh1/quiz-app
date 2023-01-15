import { IsBoolean, IsString } from 'class-validator';

class UpdateQuestionDto {
  @IsString()
  content?: string;

  @IsBoolean()
  answered?: boolean;

  @IsBoolean()
  correctlyAnswered?: boolean;
}

export default UpdateQuestionDto;
