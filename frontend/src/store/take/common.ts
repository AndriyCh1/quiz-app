import { IFinishResponse, ITakeStartResponse } from '../../common/interfaces';

export interface ITakeState {
  isFinished: boolean;
  take: ITakeStartResponse | null;
  isLoadingTake: boolean;
  failedToLoadTake: boolean;
  results: IFinishResponse | null;
  isLoadingResults: boolean;
  failedToLoadResults: boolean;
}

export enum TakeAction {
  START = 'START',
  SEND_ANSWER = 'SEND_ANSWER',
  FINISH = 'FINISH',
}
