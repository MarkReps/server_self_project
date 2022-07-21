const { Group } = require("../models/models");

class GroupService{

    async create(name){
        
        const candidate = await Group.findOne({where:{name}})

        if(candidate){
            throw Error('Такая группа уже существует!')
        }

        const group = new Group({name})
        await group.save()
        
        return group;
    }

    async getAll(){
        const groups = await Group.findAll()
        return groups;
    }

    async update(id,name){
        const group = await Group.findByPk(id)
        
        if(!group){
            throw Error("такой группы не существует!")
        }

        group.name = name;
        await group.save();

        return group;
    }

    async delete(id){
        const group = await Group.findByPk(id)
        
        if(!group){
            throw Error("такой группы не существует!")
        }

        await group.destroy();
        return group;
    }

}


module.exports = new GroupService();