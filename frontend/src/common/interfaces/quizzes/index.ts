import { IBase } from '../base';

export interface IQuiz extends IBase {
  id: string;
  title: string; // max 30 symbols
  published: boolean;
  score: number; // total score
  type: 'mixed' | 'single-choice' | 'multiple-choice' | 'select' | 'input'; // ref
  time: number; // seconds
  content: string;
  questions: IQuizQuestion[];
  user?: {
    fullName: string;
    email: string;
    avatar: string;
  };
}

export interface IQuizQuestion {
  id: string;
  active: boolean;
  type: 'single-choice' | 'multiple-choice' | 'select' | 'input';
  score: number;
  content: string;
  time: number; // seconds
  answers: IQuizAnswer[];
}

export interface IQuizAnswer {
  id: string;
  active: boolean;
  correct: boolean;
  content: string;
}

export type IDeepQuiz = {
  type: string;
  published: boolean;
  title: string;
  score: number;
  content: string;
  time: number;
  questions: IDeepQuizQuestion[];
};

interface IDeepQuizQuestion {
  active: boolean;
  type: string;
  score: number;
  content: string;
  answers: IDeepQuizAnswer[];
}

interface IDeepQuizAnswer {
  active: boolean;
  correct: boolean;
  content: string;
}

export interface IQuestion {
  id: string;
  content: string;
  score: number;
  active: boolean;
  answers: IAnswer[];
  queryConfig: {
    status: 'new' | 'edited' | 'fetched' | 'deleted';
  };
}

export interface IAnswer {
  id: string;
  active: boolean;
  correct: boolean;
  content: string;
  queryConfig: {
    status: 'new' | 'edited' | 'fetched' | 'deleted';
  };
}

export interface ICheckAnswerRequest {
  quizId: string;
  answerId: string;
}

export interface ICheckAnswerResponse {
  correct: boolean;
}

export interface IQuizzesSummary {
  id: string | null;
  title: string;
  takes: IQuizzesSummaryTake[];
}

export interface IQuizzesSummaryTake {
  id: string;
  totalScore: number;
  score: number;
  spentTime: number;
  takeDate: Date;
  correctNumber: number;
  incorrectNumber: number;
  notAnswered: number;
  questionsNumber: number;
}
