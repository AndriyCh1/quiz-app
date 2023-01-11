import { IsNumber, IsString } from 'class-validator';

class UpdateTakeDto {
  @IsString()
  status?: string;

  @IsNumber()
  currentScore?: number;
}

export default UpdateTakeDto;
