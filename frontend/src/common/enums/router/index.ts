export enum UserRoutes {
  QuizInfo = '/quiz/:id',
  ActiveQuiz = '/quiz/:id/start',
  Quizzes = '/quizzes', // Entry page, must have the same route as a visitor
  CreateQuiz = '/quizzes/create',
  Profile = '/quiz/profile',
  SingleChoiceCreator = '/quizzes/create/single-choice',
  InDevelopment = '/in-development',
  EditQuiz = '/quiz/:id/edit',
}

export enum VisitorRoutes {
  Login = '/login',
  Signup = '/signup',
  QuizInfo = '/quiz/:id',
  ActiveQuiz = '/quiz/:id/start',
  PublicQuizzes = '/quizzes', // Entry page, must have the same route as a user
}
