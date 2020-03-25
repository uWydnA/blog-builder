var express = require('express');
var router = express.Router();
var sql = require("./../sql/index")
var Right = require('../sql/col/rights')
var uuid = require('node-uuid')
let mydata = [
  {
    "title": "文章列表",
    "key": "文章管理-文章列表",
    "grade": "3",
    "category": "文章管理"
  },
  {
    "title": "创建文章",
    "key": "文章管理-创建文章",
    "grade": "2",
    "category": "文章管理"
  },
  {
    "title": "文章预览",
    "key": "文章管理-文章预览",
    "grade": 1,
    "category": "文章管理"
  },
  {
    "title": "文章分类",
    "key": "文章管理-文章分类",
    "grade": 2,
    "category": "文章管理"
  },
  {
    "title": "用户列表",
    "key": "用户管理-用户列表",
    "grade": 3,
    "category": "用户管理"
  },
  {
    "title": "添加用户",
    "key": "用户管理-添加用户",
    "grade": 3,
    "category": "用户管理"
  },
  {
    "title": "删除用户",
    "key": "用户管理-删除用户",
    "grade": 3,
    "category": "用户管理"
  },
  {
    "title": "修改用户",
    "key": "用户管理-修改用户",
    "grade": 3,
    "category": "用户管理"
  },
  {
    "title": "角色列表",
    "key": "权限管理-角色列表",
    "grade": 3,
    "category": "权限管理"
  },
  {
    "title": "权限列表",
    "key": "权限管理-权限列表",
    "grade": 3,
    "category": "权限管理"
  },
  {
    "title": "添加角色",
    "key": "权限管理-添加角色",
    "grade": 3,
    "category": "权限管理"
  },
  {
    "title": "修改角色",
    "key": "权限管理-修改角色",
    "grade": 3,
    "category": "权限管理"
  },
  {
    "title": "删除角色",
    "key": "权限管理-删除角色",
    "grade": 3,
    "category": "权限管理"
  }
]
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

// 请求数据
router.get('/', function (req, res, next) {
  sql.find({
    colName: Right
  }).then(data => {
    res.send(data)
  })
});
// 插入数据
router.post('/zhuce', function (req, res, next) {
  sql.insert({
    colName: Right,
    data: mydata
  }).then(data => {
    res.send({
      code: "666",
      message: "更新成功"
    })
  })
});
// 更新数据
router.post('/update', function (req, res, next) {
  sql.update({
    colName: Right,
    where: {
      _id: req.body._id
    },
    newdata: req.body
  }).then(() => {
    res.send({
      code: "666",
      message: "更新成功"
    })
  })
});
module.exports = router;
