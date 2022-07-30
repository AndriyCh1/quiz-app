import { HttpCode } from "../common/enums";
import HttpException from "./HttpException";

class WrongCredentialsException extends HttpException {
  constructor() {
    super(HttpCode.UNAUTHORIZED, "Wrong credentials provided");
  }
}

export default WrongCredentialsException;