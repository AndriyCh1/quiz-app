import * as jwt from 'jsonwebtoken';
import {getRepository} from "typeorm";
import Token from "./token.entity";

class TokenService {
    private tokenRepository = getRepository(Token);

    public generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '5m'}) // 15m
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})
        return {
            accessToken,
            refreshToken
        }
    }

    public validateAccessToken(token: string) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    }

    public validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    }

    public saveToken = async(userId, refreshToken) => {
        const tokenData = await this.tokenRepository.findOne({user: userId})
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            const token = await this.tokenRepository.save({id: tokenData.id, refreshToken});
            return token;
        }
        const token = await this.tokenRepository.create({user: userId, refreshToken}).save();
        return token;
    }

    async removeToken(refreshToken) {
        const tokenData = await this.tokenRepository.delete({refreshToken});
        return tokenData;
    }

    async findToken(refreshToken) {
        const tokenData = await this.tokenRepository.findOne({refreshToken});
        return tokenData;
    }
}

export default TokenService;