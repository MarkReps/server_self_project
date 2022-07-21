const userService = require("../services/user.service")
const {validationResult} = require('express-validator');
class UserController{

    async registration(req,res){
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({errors:errors.array()})
            }
            const {email,password,role} = req.body
            const user = await userService.registration(email,password,role);
            return res.status(201).json(user)
        } catch (error) {
            res.status(500).json({message:error.message})
        }
    }

    async login(req,res){
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({errors:errors.array()})
            }

            const {email, password} = req.body
            const user = await userService.login(email,password);
            return res.status(201).json(user);
        } catch (error) {
            res.status(500).json({message:error.message})
        }
    }

    async delete(req,res){
        try {

            const {id} = req.params
            const user = await userService.delete(id)
            return res.status(201).json(user);
        } catch (error) {
            res.status(500).json({message:error.message})
        }
    }

    async update(req,res){
        try {

            const errors = validationResult(req)

            if(!errors.isEmpty()){
                return res.status(400).json({errors:errors})
            }

            const {id} = req.params;
            const {email,password,role} = req.body

            const user = await userService.update(id,{email,password,role})
            return res.status(201).json(user)
        } catch (error) {
            res.status(500).json({message:error.message})
        }
    }

    async check(req,res){
        try {
            
        } catch (error) {
            res.status(500).json({message:error.message})
        }
    }

}


module.exports = new UserController();