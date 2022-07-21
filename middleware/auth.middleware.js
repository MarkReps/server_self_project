const tokenService = require("../services/token.service")

module.exports = async function(req,res,next){
    
    try{    

        const authHeader = req.headers.authorization

        if(!authHeader){
            throw Error("Пользователь не авторизован.")
        }
        const token = authHeader.split(' ')[1]
        const decodedToken = tokenService.validateAccessToken(token)
        if(!decodedToken){
            throw Error("Пользователь не авторизован !!")
        }
        req.user = decodedToken;
        next()
        } catch (error){
            return res.json({message:error.message})
        }
}