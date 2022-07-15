import { HttpCode } from "../common/http/http-code.enum";
import HttpException from "./HttpException";

class WrongCredationalsException extends HttpException {
  constructor() {
    super(HttpCode.UNAUTHORIZED, "Wrong credationals provided");
  }
}

export default WrongCredationalsException;