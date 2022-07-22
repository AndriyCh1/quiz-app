import {NextFunction,  Response} from "express";
import WrongCredationalsException from "../exceptions/WrongCredationalsException.exception";
import TokenService from "../token/token-service";
import {IAuthRequest} from "../interfaces/requestWithUserData.interface";
import {IDataInToken} from "../interfaces/dataInToken.inteface";

function AuthMiddleware ( req: IAuthRequest, res: Response, next: NextFunction ) {
    const tokenService =  new TokenService();

    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(new WrongCredationalsException());
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            return next(new WrongCredationalsException());
        }

        const userData = tokenService.validateAccessToken(accessToken) as IDataInToken;
        if (!userData) {
            return next(new WrongCredationalsException());
        }

        req.user = userData;
        next();
    } catch (e) {
        return next(new WrongCredationalsException());
    }
}

export default AuthMiddleware;