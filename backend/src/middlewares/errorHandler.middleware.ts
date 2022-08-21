import { HttpCode } from '../common/enums';
import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';

function errorHandlerMiddleware(
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const status = error.status || HttpCode.INTERNAL_SERVER_ERROR;
  const message = error.message || 'Internal Server Error';

  res.status(status).send({ status, message });
}

export default errorHandlerMiddleware;
