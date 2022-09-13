import QuizDto from './quiz.dto';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsArray,
  IsString,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';
import { QuestionTypes } from '../../common/enums';
import { Type } from 'class-transformer';

class AnswerDto {
  @IsBoolean()
  active: boolean;

  @IsBoolean()
  correct: boolean;

  @IsString()
  content: string;
}

class QuestionDto {
  @IsNumber()
  score: number;

  @IsString()
  content: string;

  @IsEnum(QuestionTypes)
  type: QuestionTypes;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => AnswerDto)
  answers: AnswerDto[];
}

class DeepQuizDto extends QuizDto {
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => QuestionDto)
  questions: QuestionDto[];
}

export default DeepQuizDto;
