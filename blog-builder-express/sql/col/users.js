// 用来创建用户的集合
const mongoose = require('../db')
const Schema = mongoose.Schema;//用来创建集合

//创建数据库中的集合的先关字段以及数据类型
const schema = new Schema({
  username:{type:String},
  password:{type:String},
  roleName:{type:String},
  roleState:{type:Boolean},
  default:{type:Boolean},
  roleType:{type:Number}//1:小编 2：管理员 3：超级管理员
})
 
//生成集合 -- 数据库中会自动生成users的数据集合
module.exports = mongoose.model('User',schema)