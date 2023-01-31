import { IUserGeneralData, IQuizzesSummary } from '../../common/interfaces';

export interface IProfileState {
  userGeneralData: IUserGeneralData | null;
  isLoadingUserGeneralData: boolean;
  failedToLoadUserGeneralData: boolean;
  userQuizzesSummaryData: IQuizzesSummary[];
  isLoadingQuizzesSummaryData: boolean;
  failedToLoadQuizzesSummaryData: boolean;
}

export enum ProfileAction {
  GET_USER_DATA = 'GET_USER_DATA',
  GET_USER_QUIZZES_SUMMARY = 'GET_USER_QUIZZES_SUMMARY',
}
