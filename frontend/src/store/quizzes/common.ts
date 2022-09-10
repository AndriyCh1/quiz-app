import { IQuiz } from '../../common/interfaces';

export interface IQuizzesState {
  quiz: IQuiz | null;
  quizzes: IQuiz[];
  isLoading: boolean;
}

export enum QuizzesAction {
  GET_All = 'GET_All',
  GET_ONE = 'GET_ONE',
  SEND = 'SEND',
}
