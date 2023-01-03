import { IQuiz } from '../../common/interfaces';

export interface IQuizzesState {
  chosenQuiz: IQuiz | null;
  quizzes: IQuiz[];
  isLoadingQuizzes: boolean;
  isLoadingChosenQuiz: boolean;
}

export enum QuizzesAction {
  GET_All_PUBLIC = 'GET_All_PUBLIC',
  GET_ONE_PUBLIC = 'GET_ONE_PUBLIC',
  GET_All_FOR_USER = 'GET_All_FOR_USER',
  GET_ONE_FOR_USER = 'GET_ONE_FOR_USER',
  CREATE = 'CREATE',
  DELETE = 'DELETE',
  UPDATE = 'UPDATE',
}
