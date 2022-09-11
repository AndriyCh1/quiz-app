import { NextFunction, Response } from 'express';
import { HttpCode, RoleType } from '../common/enums';
import { IAuthRequest } from '../common/interfaces';
import HttpException from '../exceptions/HttpException';

function validatePermission(roles: Array<RoleType>) {
  return (req: IAuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !req.userRole) {
      if (roles.includes(RoleType.VISITOR)) {
        return next();
      }
    }
    if (!roles.includes(req.userRole)) {
      throw new HttpException(HttpCode.UNAUTHORIZED, 'You don`t have permissions for this action');
    }
    return next();
  };
}
export default validatePermission;
