const groupService = require('../services/group.service');

class GroupController{

    async create(req,res){
        try {
            const {name} = req.body
            const group = await groupService.create(name);
            return res.status(201).json(group)
        } catch (error) {
            res.status(500).json({message:error.message})
        }
    }

    async getAll(req,res){
        try {
            const groups = await groupService.getAll()
            return res.status(201).json(groups)
        } catch (error) {
            res.status(500).json({message:error.message})
        }
    }

    async update(req,res){
        try {
            const {id} = req.params
            const {name} = req.body
            const group = await groupService.update(id,name)
            return res.status(201).json(group);

        } catch (error) {
            res.status(500).json({message:error.message})
        }
    }

    async delete(req,res){
        try {
            const {id} = req.params
            const group = await groupService.delete(id)
            return res.status(201).json(group);
        } catch (error) {
            res.status(500).json({message:error.message})
        }
    }
}

module.exports = new GroupController();