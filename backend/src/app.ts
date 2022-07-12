import * as express from 'express';
import Controller from './interfaces/controller.interface';

class App {
  public app: express.Application;
  
  constructor (controllers: Controller[]) {
    this.app = express();
    this.initializeControllers(controllers);
  }

  public listen() {
    this.app.listen(5000, () => {
      console.log("Server is running...");
    })
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach(controller => {
      this.app.use('/', controller.router)
    })

  }
}

export default App 