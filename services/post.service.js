const { Post, PostTag, Tag, User } = require("../models/models");

const tagService = require('./tag.service');
const userService = require("./user.service");

class PostService{

    async create(name,text,groupId,tags,email){
        const user = await userService.getUserByEmail(email)
        const post = new Post({name,text,GroupId:groupId,UserId:user.id})
        await post.save()

        if(tags){
            for (const name of tags) {
                tagService.tagCreateSupport(post.id,name)
            }
        }


        return post;
    }

    async getOne(id){

        const post = await Post.findByPk(id,{include:Tag})
        if(!post){
            throw Error("поста не существует!")
        }

        return post;

    }

    async getAll(){
        const posts = await Post.findAll({include:User})
        return posts;
    }

    async update(id,name,text,groupId,userId,tags){
        
        let post = await Post.findByPk(id,{include:[Tag]})

        if(!post){
            throw Error("поста не существует!")
        }
        if(tags){
            await tagService.tagUpdateSupport(post.id,tags,post.Tags)
        }
        await post.update({name,text,GroupId:groupId,UserId:userId})

        post = await Post.findByPk(id,{include:[Tag]})
        return post;
    }   

    async delete(id){
        const post = await Post.findByPk(id,{include:[Tag]})
        if(!post){
            throw Error("Пост не найден!")
        }

        if(post.Tags){
            await PostTag.destroy({where:{
                PostId:post.id
            }})
        }
        await post.destroy();
        
        return post;
    }
}

module.exports = new PostService();