import { IsBoolean, IsString } from 'class-validator';

class UpdateAnswerDto {
  @IsString()
  content?: string;

  @IsBoolean()
  chosen?: boolean;

  @IsBoolean()
  correct?: boolean;
}
export default UpdateAnswerDto;
