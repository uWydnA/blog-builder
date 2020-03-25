// 用来创建用户的集合
const mongoose = require('../db')
const Schema = mongoose.Schema;//用来创建集合

//创建数据库中的集合的先关字段以及数据类型
const schema = new Schema({
  userid:{type:String},
  tel:{type:String},
  password:{type:String},
  nickname:{type:String},
  sex:{type:Number},
  sex:{type:Number}, // 1表示男 0表示女
  flag:{type:Number}//0表示普通用户，1表示会员 2表示超级会员
})
 
//生成集合 -- 数据库中会自动生成users的数据集合
module.exports = mongoose.model('Role',schema)