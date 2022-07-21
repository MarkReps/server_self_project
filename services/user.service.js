const bcrypt = require('bcrypt');
const UserDto = require('../dtos/userDto');

const { User } = require("../models/models");
const tokenService = require('./token.service');

class UserService{

    async registration(email,password,role){
        
        const candidate = await User.findOne({where:{email}})

        if(candidate){
            throw Error('Пользователь уже существует!')
        }

        const hashedPassword = await bcrypt.hash(password,7);
        
        const user = new User({email,password:hashedPassword,role})
        await user.save()

        const userDto = new UserDto(user);
        const tokens = tokenService.createTokens({...userDto})

        return {
            userDto,
            ...tokens
        };
    }

    async login(email,password){
        
        const user = await User.findOne({where:{email}})

        if(!user){
            throw Error("Пользователь не существует!")
        }

        const isValidPassword = await bcrypt.compare(password,user.password);
        if(!isValidPassword){
            throw Error("Ошибка авторизации.")
        }

        const userDto = new UserDto(user)
        const tokens = tokenService.createTokens({...userDto})

        return {
            userDto,
            ...tokens
        }
    }

    async delete(id){
        const user = await User.findByPk(id)

        if(!user){
            throw Error("Пользователь не найден.")
        }

        await user.destroy()
        return user;
    }

    async update(id,newData){

        const user = await User.findByPk(id)
        
        if(!user){
            throw Error('Пользователь не найден.')
        }

        let hashedPassword;
        if(newData?.password){
            hashedPassword = await bcrypt.hash(newData.password,7);
        }

        await user.update({email:newData?.email,password:hashedPassword,role:newData?.role})

        const userData = new UserDto(user)
        const tokens = tokenService.createTokens({...userData})
        return {
            userData,
            ...tokens
        };
    }
    // проверка пользователя на логин (рендеринг на сервере)
    async check(req,res){

    }

    async getUserByEmail(email){

        const user = await User.findOne({where:{email}})
        if(!user){
            throw Error('Пользователь отсутствует.')
        }

        return user;
    }
}


module.exports = new UserService();