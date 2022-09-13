import { IQuiz } from '../../common/interfaces';

export interface IQuizzesState {
  quiz: IQuiz | null;
  quizzes: IQuiz[];
  isLoading: boolean;
}

export enum QuizzesAction {
  GET_All_VISITOR = 'GET_All_VISITOR',
  GET_ONE_VISITOR = 'GET_ONE_VISITOR',
  GET_All_USER = 'GET_All_USER',
  GET_ONE_USER = 'GET_ONE_USER',
  CREATE = 'CREATE',
}
