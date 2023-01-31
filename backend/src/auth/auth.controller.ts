import { NextFunction, Request, Response, Router } from 'express';
import multer from 'multer';

import validationMiddleware from '../middlewares/validation.middleware';
import { IController } from '../common/interfaces';
import LoginDto from './dto/login.dto';
import AuthService from './auth.service';

const ONE_DAY = 24 * 60 * 60 * 1000;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

class AuthController implements IController {
  public path = '/auth';
  public router = Router();
  readonly cookieOptions = { maxAge: 30 * ONE_DAY, httpOnly: true };

  constructor(private readonly authService: AuthService) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/register`,
      // TODO: find out how to use class-validator in DTO with BLOB property inside
      // validationMiddleware(SignupDto),
      upload.single('avatar'),
      this.registration.bind(this),
    );
    this.router.post(`${this.path}/login`, validationMiddleware(LoginDto), this.login.bind(this));
    this.router.post(`${this.path}/logout`, this.logout.bind(this));
    this.router.get(`${this.path}/refresh`, this.refresh.bind(this));
  }

  private async registration(req: Request, res: Response, next: NextFunction) {
    const userData: any = { ...req.body, avatar: req?.file };

    try {
      const user = await this.authService.register(userData);
      res.cookie('refreshToken', user.refreshToken);

      return res.json(user);
    } catch (error) {
      next(error);
    }
  }

  private async login(req: Request, res: Response, next: NextFunction) {
    const userData: LoginDto = req.body;

    try {
      const user = await this.authService.login(userData);
      res.cookie('refreshToken', user.refreshToken, this.cookieOptions);
      return res.json(user);
    } catch (error) {
      next(error);
    }
  }

  private async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const token = await this.authService.logout(refreshToken);
      res.clearCookie('refreshToken');
      return res.json(token);
    } catch (e) {
      next(e);
    }
  }

  private async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const user = await this.authService.refresh(refreshToken);
      res.cookie('refreshToken', user.refreshToken, this.cookieOptions);
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }
}

export default AuthController;
