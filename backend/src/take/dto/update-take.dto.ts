import { IsNumber, IsString } from 'class-validator';
import { TakeStatuses } from '../../common/enums';

class UpdateTakeDto {
  @IsString()
  status?: TakeStatuses;

  @IsNumber()
  currentScore?: number;

  @IsNumber()
  spentTime?: number;
}

export default UpdateTakeDto;
