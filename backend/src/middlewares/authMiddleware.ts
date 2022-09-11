import { NextFunction, Response } from 'express';
import WrongCredentialsException from '../exceptions/WrongCredationalsException.exception';
import TokenService from '../token/token-service';
import { IAuthRequest, IDataInToken } from '../common/interfaces';
import { RoleType } from '../common/enums';

function authMiddleware(req: IAuthRequest, res: Response, next: NextFunction) {
  const tokenService = new TokenService();

  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      req.user = null;
      req.userRole = RoleType.VISITOR;
      return next();
    }

    const accessToken = authorizationHeader.split(' ')[1];
    if (!accessToken) {
      req.user = null;
      req.userRole = RoleType.VISITOR;
      return next();
    }

    const userData = tokenService.validateAccessToken(accessToken) as IDataInToken;
    if (!userData) {
      req.user = null;
      req.userRole = RoleType.VISITOR;
      return next();
    }

    req.user = userData;
    req.userRole = RoleType.USER;
    next();
  } catch (e) {
    return next(new WrongCredentialsException());
  }
}

export default authMiddleware;
