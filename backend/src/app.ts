import * as express from 'express';
import errorHandlerMiddleware from './middlewares/errorHandler.middleware';
import Controller from './interfaces/controller.interface';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';

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
      console.log(`Server is running on ${process.env.PORT} port`);
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
    this.app.use(cors({
      credentials: true,
      origin: process.env.CLIENT_URL
    }));
  }

  private initializeErrorHandling() {
    this.app.use(errorHandlerMiddleware);
  }
}

export default App;