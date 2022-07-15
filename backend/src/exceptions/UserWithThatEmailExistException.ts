import { HttpCode } from "../common/http/http-code.enum";
import HttpException from "./HttpException";

class UserWithThatEmailExistException extends HttpException {
  constructor(email: string) {
    super(HttpCode.BAD_REQUEST, `User with email ${email} already exists`);
  }
}

export default UserWithThatEmailExistException;