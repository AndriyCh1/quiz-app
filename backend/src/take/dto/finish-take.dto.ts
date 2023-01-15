import { IsNumber } from 'class-validator';

class FinishTakeDto {
  @IsNumber()
  spentTime: number;
}

export default FinishTakeDto;
