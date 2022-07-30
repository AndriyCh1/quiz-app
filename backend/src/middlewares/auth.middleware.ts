import {NextFunction,  Response} from "express";
import WrongCredentialsException from "../exceptions/WrongCredationalsException.exception";
import TokenService from "../token/token-service";
import {IAuthRequest, IDataInToken} from "../common/interfaces";

function AuthMiddleware ( req: IAuthRequest, res: Response, next: NextFunction ) {
    const tokenService =  new TokenService();

    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(new WrongCredentialsException());
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            return next(new WrongCredentialsException());
        }

        const userData = tokenService.validateAccessToken(accessToken) as IDataInToken;
        if (!userData) {
            return next(new WrongCredentialsException());
        }

        req.user = userData;
        next();
    } catch (e) {
        return next(new WrongCredentialsException());
    }
}

export default AuthMiddleware;