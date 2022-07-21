const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const Group = sequelize.define('Group',{
    id:{type:DataTypes.INTEGER,autoIncrement:true,primaryKey:true},
    name:{type:DataTypes.TEXT,require:true},
},{timestamps:false})

const Tag = sequelize.define('Tag',{
    id:{type:DataTypes.INTEGER,autoIncrement:true,primaryKey:true},
    name:{type:DataTypes.TEXT,require:true},
    
},{timestamps:false})

const User = sequelize.define('User',{
    id:{type:DataTypes.INTEGER,autoIncrement:true,primaryKey:true},
    email:{type:DataTypes.TEXT,require:true,unique:true},
    password:{type:DataTypes.TEXT,require:true},
    role:{type:DataTypes.TEXT,defaultValue:'USER'}
    
},{timestamps:false})

const Post = sequelize.define('Post',{
    id:{type:DataTypes.INTEGER,autoIncrement:true,primaryKey:true},
    name:{type:DataTypes.TEXT,require:true},
    text:{type:DataTypes.TEXT,require:true},
    
},{timestamps:false})

const PostTag = sequelize.define('PostTag',{
    TagId:{
        type:DataTypes.INTEGER,
        references:{
            model:Tag,
            key:'id'
        }
    },
    PostId:{
        type:DataTypes.INTEGER,
        references:{
            model:Post,
            key:'id'
        }
    },
    
},{timestamps:false})

Group.hasMany(Post)
Post.belongsTo(Group)

User.hasMany(Post)
Post.belongsTo(User)

Post.belongsToMany(Tag,{through:PostTag})
Tag.belongsToMany(Post,{through:PostTag})


module.exports ={
    Post,
    PostTag,
    Tag,
    User,
    Group
}