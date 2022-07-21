const postService = require('../services/post.service');

class PostController{

    async create(req,res){
        try {
            const {name,text,groupId,tags} = req.body
            const user = req.user
            const post = await postService.create(name,text,groupId,tags,user.email);
            return res.status(201).json(post)
        } catch (error) {
            res.status(500).json({message:error.message})
        }
    }

    async getOne(req,res){
        try {
            const {id} = req.params
            const post  = await postService.getOne(id)
            return res.status(201).json(post)
        } catch (error) {
            res.status(500).json({message:error.message})
        }
    }

    async getAll(req,res){
        try {
            const posts = await postService.getAll()
            return res.status(201).json(posts)
        } catch (error) {
            res.status(500).json({message:error.message})
        }
    }

    async update(req,res){
        try {
            const {id} = req.params
            const {name,text,groupId,userId,tags} = req.body
            const post = await postService.update(id,name,text,groupId,userId,tags)
            return res.status(201).json(post)
        } catch (error) {
            res.status(500).json({message:error.message})
        }
    }

    async delete(req,res){
        try {
            const {id} = req.params
            const post = await postService.delete(id)
            return res.status(201).json(post)
        } catch (error) {
            res.status(500).json({message:error.message})
        }
    }
}


module.exports = new PostController();