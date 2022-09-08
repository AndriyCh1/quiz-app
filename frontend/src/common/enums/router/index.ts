export enum QuizzesPageType {
  All = 'all',
  Public = 'public',
  Created = 'created',
}

export enum UserRoutes {
  QuizInfo = '/quiz/:slug',
  ActiveQuiz = '/quiz/:slug/start',
  Quizzes = '/quizzes/:type',
  CreateQuiz = '/quizzes/create',
  History = '/quiz/history',
  SingleChoiceCreator = '/quizzes/create/single-choice',
  InDevelopment = '/in-development',
}

export enum VisitorRoutes {
  Login = '/login',
  Signup = '/signup',
  QuizInfo = '/quiz/:slug',
  ActiveQuiz = '/quiz/:slug/start',
  PublicQuizzes = '/',
}
