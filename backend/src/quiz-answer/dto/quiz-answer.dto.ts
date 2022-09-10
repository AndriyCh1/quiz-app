import { IsBoolean, IsString } from 'class-validator';

class AnswerDto {
  @IsBoolean()
  active: boolean;

  @IsBoolean()
  correct: boolean;

  @IsString()
  content: string;
}

export default AnswerDto;
