import * as express from 'express';
import errorHandlerMiddleware from './middlewares/errorHandler.middleware';
import Controller from './interfaces/controller.interface';
import * as cookieParser from 'cookie-parser';

class App {
  public app: express.Application;
  
  constructor (controllers: Controller[]) {
    this.app = express();

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(process.env.PORT, () => {
      console.log("Server is running...");
    })
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach(controller => {
      this.app.use('/', controller.router);
    })
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(cookieParser());
  }

  private initializeErrorHandling() {
    this.app.use(errorHandlerMiddleware);
  }
}

export default App;