const jwt = require('jsonwebtoken');

class TokenService{

    createTokens(payload){
        const accessToken = jwt.sign(payload,process.env.ACCESS_JWT_SECRET,{expiresIn:'6h'})
        const refreshToken = jwt.sign(payload,process.env.REFRESH_JWT_SECRET,{expiresIn:'6h'})
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token){
        const result = jwt.verify(token,process.env.ACCESS_JWT_SECRET)
        return result;
    }

    validateRefreshToken(token){
        const result = jwt.verify(token,process.env.REFRESH_JWT_SECRET)
        return result;
    }
}

module.exports = new TokenService();