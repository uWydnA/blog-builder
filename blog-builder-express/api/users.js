var express = require('express');
var router = express.Router();
var sql = require("./../sql/index")
var User = require('../sql/col/users')
var uuid = require('node-uuid')
/**
 * @api {get} /api/users 登录接口
 * @apiDescription 登录接口
 * @apiGroup users
 * @apiParam {string} tel 手机号码
 * @apiParam {string} password 手机号码
 * @apiSuccessExample {json} Success-response:
 *  res.send({
        code:'10808',
        message:'用户还未注册'
    })
    res.send({
        code:'10000',
        message:'密码错误'
    })
     res.send({
      code:'10888',
      message:"登录成功"
    })
  *  @apiSampleRequest /api/users
  *  @apiVersion 1.0.0
 */
router.get('/', function(req, res, next) {
  res.send({name:'users'})
});

router.post('/login', function(req, res, next) {

  const { username, password } = req.body
  //判断用户名是否存在
  sql.find({
    colName: User,
    where:{
      username
    }
  }).then(data => {
    //不存在
    if (data.length === 0) {
      res.send({
        code: 10805,
        message: '用户名未注册'
      })
    } else {
      //存在，判断密码是否正确
      sql.find({
        colName: User,
        where:{
          username,
          password
        }
      }).then(data => {
        //不正确
        if (data.length === 0) {
          res.send({
            code: 10806,
            message: '用户密码不正确'
          })
        } else {
          //正确，判断登录权限是否开启
          if ( data[0].roleState ) {
            data[0].password = null
            res.send({
              code: 16888,
              message: '登录成功',
              data: data[0]
            })
          } else {
            res.send({
              code: 10808,
              message: '登录未授权'
            })
          }
        }
      })
    }
  })
});

router.post('/register', function(req, res, next) {

const { username, password, roleName, roleState, default:Boolean, roleType } = req.body
// 查询是否有该账户名
sql.find({
  colName: User,
  where:{
    username
  }
}).then(data => {
    // 没有，注册
    if (data.length === 0) {
      sql.insert({
        colName: User,
        data: {
          userId: 'user_' + uuid.v1(),
          username,
          password,
          roleName,
          roleState,
          default:Boolean,
          roleType
        }
      }).then(()=>{
          res.send({
            code: 16888, 
            message:'注册成功'
          })
      })
      // 有，用户名已注册
    } else {
        res.send({
          code: 10606,
          message: '用户名已注册'
        })
    }
  })
});

module.exports = router;
