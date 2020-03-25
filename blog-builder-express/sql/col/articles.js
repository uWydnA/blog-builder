// 用来创建用户的集合
const mongoose = require('../db')
const Schema = mongoose.Schema;//用来创建集合

//创建数据库中的集合的先关字段以及数据类型
const schema = new Schema({
  title: {type:String},
  tag: {type:String},
  category: {type:String},
  time:{type:String},
  content:{type:String},
  author: {type:String},
  roleType: {type:Number},
})
 
//生成集合 -- 数据库中会自动生成users的数据集合
module.exports = mongoose.model('Article',schema)