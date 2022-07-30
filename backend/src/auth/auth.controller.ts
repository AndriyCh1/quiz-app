import { NextFunction, Request, Response, Router } from "express";
import validationMiddleware from "../middlewares/validation.middleware";
import {IController} from "../common/interfaces";
import LoginDto from "./dto/login.dto";
import UserDto from "../user/dto/user.dto";
import AuthService from "./auth.service";
import SignupDto from "./dto/signup.dto";

class AuthController implements IController {
  public path = '/auth';
  public router = Router();

  constructor(private readonly authService: AuthService) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/register`, validationMiddleware(SignupDto), this.registration);
    this.router.post(`${this.path}/login`, validationMiddleware(LoginDto), this.login);
    this.router.post(`${this.path}/logout`, this.logout);
    this.router.get(`${this.path}/refresh`, this.refresh);
  }

  // Need to use arrow function to use context of this class
  private registration = async (req: Request, res: Response, next: NextFunction) => {
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