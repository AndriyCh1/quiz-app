import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import HttpException from "../exceptions/HttpException";
import { NextFunction, Request, Response } from "express";
import { HttpCode } from "../common/enums";

function validationMiddleware(type: any) { // !!! any
  return (req: Request, res: Response, next: NextFunction) => {
    validate(plainToInstance(type, req.body)).then(
      (errors: ValidationError[]) => {
        if (errors.length > 0) {
          const message = errors
            .map((error) => Object.values(error.constraints))
            .join(", ");
          next(new HttpException(HttpCode.BAD_REQUEST, message));
        } else {
          next();
        }
      }
    );
  };
}

export default validationMiddleware;
