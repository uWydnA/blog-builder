var express = require('express');
var router = express.Router();
var sql = require("./../sql/index")
var Role = require('../sql/col/roles')
var uuid = require('node-uuid')
/**
 * @api {post} /api/users/login 登录接口
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
  *  @apiSampleRequest /api/users/login
  *  @apiVersion 1.0.0
 */
router.get('/', function(req, res, next) {
 res.send({name:'roles'})
});


module.exports = router;
