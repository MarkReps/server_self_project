const {validationResult} = require('express-validator');

const tagService = require('../services/tag.service');

class TagController{

    async create(req,res){
        try {

            const errors = validationResult(req)

            if(!errors.isEmpty()){
                return res.status(400).json({errors:errors})
            }

            const {name} = req.body
            const tag = await tagService.create(name);
            return res.status(201).json(tag)
        } catch (error) {
            res.status(500).json({message:error.message})
        }
    }

    async getAll(req,res){
        try {
            const tags = await tagService.getAll()
            return res.status(201).json(tags)
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

            const {id} = req.params
            const {name} = req.body
            const tag = await tagService.update(id,name)
            return res.status(201).json(tag);

        } catch (error) {
            res.status(500).json({message:error.message})
        }
    }

    async delete(req,res){
        try {
            const errors = validationResult(req)

            if(!errors.isEmpty()){
                return res.status(400).json({errors:errors})
            }
            
            const {id} = req.params
            const tag = await tagService.delete(id)
            return res.status(201).json(tag);
        } catch (error) {
            res.status(500).json({message:error.message})
        }
    }
}

module.exports = new TagController();