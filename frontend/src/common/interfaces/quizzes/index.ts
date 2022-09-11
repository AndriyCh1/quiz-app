import { IBase } from '../base';

export interface IQuizAnswer {
  id: number | string;
  active: boolean;
  correct: boolean;
  content: string;
}

export interface IQuizQuestion {
  id: number | string;
  active: boolean;
  type: 'single-choice' | 'multiple-choice' | 'select' | 'input';
  score: number;
  content: string;
  time: number; // seconds
  answers: IQuizAnswer[];
}

export interface IQuiz extends IBase {
  id: number | string;
  title: string; // max 30 symbols
  published: boolean;
  score: number; // total score
  type: 'mixed' | 'single-choice' | 'multiple-choice' | 'select' | 'input'; // ref
  time: number; // seconds
  content: string;
  questions: IQuizQuestion[];
  user?: {
    fullName: string;
  };
}
