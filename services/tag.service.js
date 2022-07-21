const { Tag,PostTag } = require("../models/models");


class TagService{

    async create(name){

        const candidate = await Tag.findOne({where:{name}})

        if(candidate){
            throw Error('Такая группа уже существует!')
        }

        const tag = new Tag({name})
        await tag.save()
        
        return tag;
    }

    async getAll(){
        const tags = await Tag.findAll()
        return tags;
    }

    async getOne(name){
        const tag = await Tag.findOne({where:{name}})
        return tag;
    }

    async update(id,name){
        const tag = await Tag.findByPk(id)
        
        if(!tag){
            throw Error("такой группы не существует!")
        }

        tag.name = name;
        await tag.save();

        return tag;
    }

    async delete(id){
        const tag = await Tag.findByPk(id)
        
        if(!tag){
            throw Error("такой группы не существует!")
        }

        await tag.destroy();
        return tag;
    }

    async tagCreateSupport(PostId,tagName){
        let tag = await this.getOne(tagName)
        if(!tag){
            tag = await this.create(tagName)
        }
        const postTag = new PostTag({PostId,TagId:tag.id})
        await postTag.save()
    }

    async tagUpdateSupport(PostId,newTags,oldTags){
        
        
        
        for (const elm of oldTags) {
            
            const inNewTags = newTags.includes(elm.name)
            if (!inNewTags){
                await elm.PostTag.destroy()
            }
            if(inNewTags){
                const index = newTags.indexOf(elm.name)
                newTags.splice(index,1)
            }
        }
        
        for (const tag of newTags) {
            await this.tagCreateSupport(PostId,tag)
        }
        
    }

}


module.exports = new TagService();