import 'dotenv/config'; // ! Should go first !
import { createConnection } from 'typeorm';
import validateEnv from './utils/validateEnv';
import config from './ormconfig';
import App from './app';

import AuthController from './auth/auth.controller';
import AuthService from './auth/auth.service';

import UserController from './user/user.controller';
import UserService from './user/user.service';

import QuizController from './quiz/quiz.controller';
import QuizService from './quiz/quiz.service';

import QuizQuestionController from './quiz-question/quiz-question.controller';
import QuizQuestionService from './quiz-question/quiz-question.service';

import QuizAnswerController from './quiz-answer/quiz-answer.controller';
import QuizAnswerService from './quiz-answer/quiz-answer.service';

validateEnv();

(async () => {
  try {
    await createConnection(config);
  } catch (error) {
    console.log('Error while connecting to the database', error);
    return error;
  }

  const app = new App([
    new AuthController(new AuthService()),
    new UserController(new UserService()),
    new QuizController(new QuizService()),
    new QuizQuestionController(new QuizQuestionService()),
    new QuizAnswerController(new QuizAnswerService()),
  ]);

  app.listen();
})();
