import 'dotenv/config'; // ! Should go first !
import { createConnection } from 'typeorm';
import validateEnv from './utils/validateEnv';
import config from './ormconfig';
import App from './app';
import AuthController from './auth/auth.controller';
import UserController from './user/user.controller';
import UserService from './user/user.service';
import AuthService from './auth/auth.service';

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
  ]);

  app.listen();
})();
