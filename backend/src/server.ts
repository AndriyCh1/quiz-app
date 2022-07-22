import "dotenv/config"; // ! Should go first !
import { createConnection } from "typeorm";
import App from "./app";
import AuthController from "./auth/auth.controller";
import validateEnv from "./utils/validateEnv";
import config from "./ormconfig";
import UserController from "./user/user.controller";

validateEnv();

(async() =>  {

  try {
    await createConnection(config);
  } catch (error) {
    console.log("Error while connecting to the database", error);
    return error;
  }

  const app = new App([
    new AuthController(),
    new UserController()
  ]);

  app.listen();
})();
