import { IAuthRequest, IController } from '../common/interfaces/';
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
    this.router.get(`${this.path}/general`, this.getGeneralData.bind(this));
  }

  private async getGeneralData(req: IAuthRequest, res: Response, next: NextFunction) {
    const userId = req.user.id;

    try {
      const profileData = await this.userService.getGeneralData(userId);
      return res.send(profileData);
    } catch (e) {
      next(e);
    }
  }
}

export default UserController;
