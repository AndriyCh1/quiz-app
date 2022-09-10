export interface IAnswer {
  active: boolean;
  correct: boolean;
  content: string;
}

export interface IDeepQuestion {
  active: string;
  score: number;
  content: string;
  type: string;
  answers: IAnswer[];
}

export interface IDeepQuiz {
  title: string;
  active: boolean;
  type: string;
  score: number;
  content: string;
  time: number;
  questions: IDeepQuestion[];
}
