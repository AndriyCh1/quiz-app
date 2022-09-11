import { IController } from '../common/interfaces/';
import { NextFunction, Request, Response, Router } from 'express';
import UserService from './user.service';
import authMiddleware from '../middlewares/authMiddleware';

class UserController implements IController {
  public path = '/user';
  public router = Router();

  constructor(private readonly userService: UserService) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // TODO: fix auth middleware using (problem with custom req)
    // @ts-ignore
    this.router.get(`${this.path}/users`, authMiddleware, this.getAllUsers.bind(this));
  }

  private async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.userService.getAll();
      return res.send(users);
    } catch (e) {
      next(e);
    }
  }
}

export default UserController;
