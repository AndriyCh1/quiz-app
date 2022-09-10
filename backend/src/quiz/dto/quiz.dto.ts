import { IsBoolean, IsEnum, IsNumber, IsString } from 'class-validator';
import { QuizTypes } from '../../common/enums';

class QuizDto {
  @IsBoolean()
  active: boolean;

  @IsEnum(QuizTypes)
  type: string;

  @IsNumber()
  score: number;

  @IsString()
  content: string;

  @IsNumber()
  time: number;
}

export default QuizDto;
