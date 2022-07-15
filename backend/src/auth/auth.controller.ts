import { NextFunction, Request, Response, Router } from "express";
import validationMiddleware from "../middlewares/validation.middleware";
import Controller from "../interfaces/controller.interface";
import LoginDto from "./login.dto";
import UserDto from "../user/user.dto";
import AuthService from "./auth.service";

class AuthController implements Controller {
  public path = '/auth';
  public router = Router();
  private authService = new AuthService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/login`, validationMiddleware(LoginDto), this.login);
    this.router.post(`${this.path}/register`, validationMiddleware(LoginDto), this.registration);
  }

  // Need to use arrow function to use context of this class
  private  registration = async (req: Request, res: Response, next: NextFunction) => { 
    const userData: UserDto = req.body;
    
    try {
      const {cookie, user} = await this.authService.register(userData);
      res.setHeader('Set-Cookie', [cookie]);
      res.send(user);
    } catch (error) {
      next(error)
    }
  }

  private login = async(req: Request, res: Response, next: NextFunction) => {
    const userData: UserDto = req.body;

    try {
      const { cookie, user } = await this.authService.login(userData);
      res.setHeader('Set-Cookie', [cookie]);
      res.send(user);
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;
