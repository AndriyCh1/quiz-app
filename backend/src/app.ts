import * as express from 'express';
import errorHandlerMiddleware from './middlewares/errorHandler.middleware';
import { IController } from './common/interfaces';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import authMiddleware from './middlewares/authMiddleware';
import { Request, Response } from 'express';

class App {
  public app: express.Application;

  constructor(controllers: IController[]) {
    this.app = express();

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(`Server is running on ${process.env.PORT} port`);
    });
  }

  private initializeControllers(controllers: IController[]) {
    this.app.use('/', (req: Request, res: Response) => res.send({ message: 'Everything is ok' }));
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(
      cors({
        credentials: true,
        origin: process.env.CLIENT_URL,
      }),
    );
    this.app.use(authMiddleware);
  }

  private initializeErrorHandling() {
    this.app.use(errorHandlerMiddleware);
  }
}

export default App;
