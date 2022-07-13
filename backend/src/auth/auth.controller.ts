import { Request, Response, Router } from "express";
import validationMiddleware from "../middlewares/validation.middleware";
import Controller from "../interfaces/controller.interface";
import LogInDto from "./login.dto";

class AuthController implements Controller {
  public path = '/auth';
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/login`, validationMiddleware(LogInDto), this.login);
    this.router.post(`${this.path}/register`, validationMiddleware(LogInDto), this.registration);
  }

  private async registration(req: Request, res: Response) {
    res.send("Login route called");
  }

  private async login(req: Request, res: Response) {
    res.send("Login route called");
  }
}

export default AuthController;
