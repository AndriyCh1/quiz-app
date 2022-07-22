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
    this.router.post(`${this.path}/register`, validationMiddleware(LoginDto), this.registration);
    this.router.post(`${this.path}/login`, validationMiddleware(LoginDto), this.login);
    this.router.post(`${this.path}/logout`, this.logout);
    this.router.post(`${this.path}/refresh`, this.refresh);
  }

  // Need to use arrow function to use context of this class
  private  registration = async (req: Request, res: Response, next: NextFunction) => { 
    const userData: UserDto = req.body;
    
    try {
      const user = await this.authService.register(userData);
      res.cookie('refreshToken', user.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
      return res.json(user);
    } catch (error) {
      next(error)
    }
  }

  private login = async(req: Request, res: Response, next: NextFunction) => {
    const userData: UserDto = req.body;

    try {
      const user = await this.authService.login(userData);
      res.cookie('refreshToken', user.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
      return res.json(user);
    } catch (error) {
      next(error);
    }
  }

  private logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {refreshToken} = req.cookies;
      const token = await this.authService.logout(refreshToken);
      res.clearCookie('refreshToken');
      return res.json(token);
    } catch (e) {
      next(e);
    }
  }

  private refresh = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {refreshToken} = req.cookies;
      const user = await this.authService.refresh(refreshToken);
      res.cookie('refreshToken', user.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }
}

// TODO: USE WHETHER FUNCTION EXPRESSION OR DECLARATION (NOT BOTH)

export default AuthController;
