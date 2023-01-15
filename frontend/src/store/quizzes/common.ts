import { IQuiz } from '../../common/interfaces';

export interface IQuizzesState {
  chosenQuiz: IQuiz | null;
  quizzes: IQuiz[];
  isLoadingQuizzes: boolean;
  isLoadingChosenQuiz: boolean;
  isAnswerCorrect: boolean | null;
  isCheckingAnswer: boolean;
  isCheckingFailed: boolean;
}

export enum QuizzesAction {
  GET_All = 'GET_All',
  GET_ONE = 'GET_ONE',
  CREATE = 'CREATE',
  DELETE = 'DELETE',
  UPDATE = 'UPDATE',
  CHECK_ANSWER = 'CHECK_ANSWER',
}
