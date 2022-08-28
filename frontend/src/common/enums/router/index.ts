export enum UserRoutes {
  QuizInfo = '/quiz/:slug',
  ActiveQuiz = '/quiz/:slug/start',
  PublicQuizzes = '/quizzes/public',
  CreatedQuizzes = '/quizzes/created',
  CreateQuiz = '/quizzes/create',
  History = '/quiz/history',
}

export enum VisitorRoutes {
  Login = '/login',
  Signup = '/signup',
  QuizInfo = '/quiz/:slug',
  ActiveQuiz = '/quiz/:slug/start',
  PublicQuizzes = '/',
}
