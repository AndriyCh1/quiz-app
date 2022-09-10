export enum UserRoutes {
  QuizInfo = '/quiz/:id',
  ActiveQuiz = '/quiz/:id/start',
  Quizzes = '/quizzes',
  CreateQuiz = '/quizzes/create',
  History = '/quiz/history',
  SingleChoiceCreator = '/quizzes/create/single-choice',
  InDevelopment = '/in-development',
}

export enum VisitorRoutes {
  Login = '/login',
  Signup = '/signup',
  QuizInfo = '/quiz/:id',
  ActiveQuiz = '/quiz/:id/start',
  PublicQuizzes = '/',
}
