export enum UserRoutes {
  QuizInfo = '/quiz/:id',
  ActiveQuiz = '/quiz/:id/start',
  Quizzes = '/quizzes', // Entry page, must have the same route as a visitor
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
  PublicQuizzes = '/quizzes', // Entry page, must have the same route as a user
}
