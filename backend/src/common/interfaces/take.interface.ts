export interface ITakeAnswerResponse {
  content: string;
  chosen: boolean;
}

export interface ITakeQuestionDeepResponse {
  content: string;
  score: number;
  answered: boolean;
  correctlyAnswered: boolean;
  answers: ITakeAnswerResponse[];
}

export interface ITakeDeepResponse {
  content: string;
  status: string;
  currentScore: number;
  totalScore: number;
  questions: ITakeQuestionDeepResponse[];
}

export interface ICreateTakeAnswer {
  content: string;
  correct: boolean;
  question: any;
}

export interface ICreateTakeQuestion {
  score: number;
  content: string;
  take: any;
}

export interface IResultResponse {
  questionsNumber: number;
  correctNumber: number;
  score: number;
  totalScore: number;
  totalTime: number;
  spentTime: number;
}
