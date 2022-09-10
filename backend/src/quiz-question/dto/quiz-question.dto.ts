import { IsEnum, IsNumber, IsString } from 'class-validator';
import { QuestionTypes } from '../../common/enums';

class QuestionDto {
  @IsNumber()
  score: number;

  @IsString()
  content: string;

  @IsEnum(QuestionTypes)
  type: string;
}

export default QuestionDto;
