import { HttpCode } from "../common/http/http-code.enum";
import HttpException from "./HttpException";

class WrongCredentialsException extends HttpException {
  constructor() {
    super(HttpCode.UNAUTHORIZED, "Wrong credentials provided");
  }
}

export default WrongCredentialsException;