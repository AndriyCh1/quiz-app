export interface IAnswer {
  id?: string;
  active: boolean;
  correct: boolean;
  content: string;
}

export interface IQuestion {
  id?: string;
  active: string;
  score: number;
  content: string;
  type: string;
}

export interface IQuiz {
  id?: string;
  title: string;
  published: boolean;
  type: string;
  score: number;
  content: string;
  time: number;
}

// Deep data

export interface IDeepQuestion {
  id?: string;
  active: string;
  score: number;
  content: string;
  type: string;
  answers: IAnswer[];
}

export interface IDeepQuiz {
  id?: string;
  title: string;
  published: boolean;
  type: string;
  score: number;
  content: string;
  time: number;
  questions: IDeepQuestion[];
  user: {
    fullName: string;
  };
}

// Updating
type ResourceStatus = 'new' | 'edited' | 'deleted';

export interface IUpdateAnswer {
  id?: string;
  active: boolean;
  correct: boolean;
  content: string;
  queryConfig: {
    status: ResourceStatus;
  };
}

export interface IDeepUpdateQuestion {
  id?: string;
  active: string;
  score: number;
  content: string;
  type: string;
  answers: IUpdateAnswer[];
  queryConfig: {
    status: ResourceStatus;
  };
}

export interface IDeepUpdateQuiz {
  id?: string;
  title: string;
  published: boolean;
  type: string;
  score: number;
  content: string;
  time: number;
  questions: IDeepUpdateQuestion[];
  user: {
    fullName: string;
  };
}
