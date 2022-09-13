import { IBase } from '../base';

export interface IQuizAnswer {
  id: string;
  active: boolean;
  correct: boolean;
  content: string;
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
  };
}

interface IDeepQuizAnswer {
  active: boolean;
  correct: boolean;
  content: string;
}

interface IDeepQuizQuestion {
  active: boolean;
  type: string;
  score: number;
  content: string;
  answers: IDeepQuizAnswer[];
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
