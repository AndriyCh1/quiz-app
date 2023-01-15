export interface ISendAnswerRequest {
  takeId: string;
  questionId: string;
  answerId: string;
}

export interface ITakeStartResponse {
  id: string;
  title: string;
  content: string;
  status: boolean;
  currentScore: 0;
  totalScore: number;
  questions: ITakeStartResponseQuestion[];
}

export interface ITakeStartResponseQuestion {
  id: string;
  content: string;
  score: number;
  answered: boolean;
  correctlyAnswered: boolean | null;
  answers: ITakeStartResponseAnswer[];
}

export interface ITakeStartResponseAnswer {
  id: string;
  content: string;
  chosen: boolean;
}

export interface IFinishRequest {
  takeId: string;
  spentTime: number;
}

export interface IFinishResponse {
  questionsNumber: number;
  correctNumber: number;
  score: number;
  totalScore: number;
  totalTime: number;
  spentTime: number;
}
