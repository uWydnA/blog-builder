var express = require('express');
var router = express.Router();
var sql = require("./../sql/index")
var Categorie = require('../sql/col/categories')
var uuid = require('node-uuid')
let oldCateGory = [
  {
  "title": "vue",
  "value": "vue",
  "id": 11,
  "default": true,
  "grade": 1
  },
  {
  "title": "react",
  "value": "react",
  "id": 12,
  "default": true,
  "grade": 1
  },
  {
  "title": "javaScript",
  "value": "javaScript",
  "id": 13,
  "default": true,
  "grade": 1
  },
  {
  "title": "node.js",
  "value": "node.js",
  "id": 14,
  "default": true,
  "grade": 1
  },
  {
  "title": "express",
  "value": "express",
  "id": 15,
  "default": true,
  "grade": 1
  },
  {
  "title": "redux",
  "value": "redux",
  "id": 16,
  "default": true,
  "grade": 1
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

sql.find({
  colName: Categorie,
  where: {
    title:'vue'
  }
}).then(data => {
  if (data.length === 0 || data === undefined) {
    sql.insert({
      colName: Categorie,
      data: oldCateGory
    })
  }
})

router.get('/', function(req, res, next) {
  sql.find({
    colName: Categorie,
  })
    .then(data => {
      res.send(data)
    })
});


module.exports = router;
