import { IsBoolean, IsEnum, IsNumber, IsString } from 'class-validator';
import { QuizTypes } from '../../common/enums';

class QuizDto {
  @IsString()
  title: string;

  @IsBoolean()
  published: boolean;

  @IsEnum(QuizTypes)
  type: QuizTypes;

  @IsNumber()
  score: number;

  @IsString()
  content: string;

  @IsNumber()
  time: number;
}

export default QuizDto;
