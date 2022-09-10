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

export interface IQuiz {
  id: number | string;
  title: string; // max 30 symbols
  score: number; // total score
  type: 'mixed' | 'single-choice' | 'multiple-choice' | 'select' | 'input'; // ref
  time: number; // seconds
  content: string;
  questions: IQuizQuestion[];
}
