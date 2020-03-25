var express = require('express');
var router = express.Router();
var sql = require("./../sql/index")
var Articles = require('../sql/col/articles')
var uuid = require('node-uuid')
let oldArticle = [
  {
    "title": "如何学好vue-router",
    "tag": "vue-router",
    "time": "2019-10-11",
    "category": "vue",
    "content": "<p></p>\n<p style=\"text-align:left;\">do dream</p>\n<p style=\"text-align:left;\"></p>\n<img src=\"https://www.jdon.com/simgs/course/flux.png\" alt=\"undefined\" style=\"height: auto;width: auto\"/>\n<p></p>\n",
    "author": "admin",
    "roleType": 3,
    "id": 3
  },
  {
    "title": "redux是啥？",
    "category": "redux",
    "time": "2019-10-21",
    "tag": "redux基础",
    "content": "<p style=\"text-align:start;\"><span style=\"color: rgb(51,51,51);background-color: rgb(255,255,255);font-size: 16px;font-family: Helvetica Neue\", Helvetica, Arial, sans-serif;\">Redux 是 JavaScript 状态容器，提供可预测化的状态管理。 (如果你需要一个 WordPress 框架，请查看</span> <a href=\"https://reduxframework.com/\" target=\"_blank\"><span style=\"color: rgb(65,131,196);background-color: initial;font-size: inherit;font-family: Helvetica Neue\", Helvetica, Arial, sans-serif;\">Redux Framework</span></a><span style=\"color: rgb(51,51,51);background-color: rgb(255,255,255);font-size: 16px;font-family: Helvetica Neue\", Helvetica, Arial, sans-serif;\">。)</span></p>\n<p style=\"text-align:start;\"><span style=\"color: rgb(51,51,51);background-color: rgb(255,255,255);font-size: 16px;font-family: Helvetica Neue\", Helvetica, Arial, sans-serif;\">可以让你构建一致化的应用，运行于不同的环境（客户端、服务器、原生应用），并且易于测试。不仅于此，它还提供 超爽的开发体验，比如有一个</span><a href=\"https://github.com/gaearon/redux-devtools\" target=\"_blank\"><span style=\"color: rgb(65,131,196);background-color: initial;font-size: inherit;font-family: Helvetica Neue\", Helvetica, Arial, sans-serif;\">时间旅行调试器可以编辑后实时预览</span></a><span style=\"color: rgb(51,51,51);background-color: rgb(255,255,255);font-size: 16px;font-family: Helvetica Neue\", Helvetica, Arial, sans-serif;\">。</span></p>\n<p style=\"text-align:start;\"><span style=\"color: rgb(51,51,51);background-color: rgb(255,255,255);font-size: 16px;font-family: Helvetica Neue\", Helvetica, Arial, sans-serif;\">Redux 除了和</span> <a href=\"https://facebook.github.io/react/\" target=\"_blank\"><span style=\"color: rgb(65,131,196);background-color: initial;font-size: inherit;font-family: Helvetica Neue\", Helvetica, Arial, sans-serif;\">React</span></a> <span style=\"color: rgb(51,51,51);background-color: rgb(255,255,255);font-size: 16px;font-family: Helvetica Neue\", Helvetica, Arial, sans-serif;\">一起用外，还支持其它界面库。 它体小精悍（只有2kB，包括依赖）。</span>&nbsp;</p>\n",
    "author": "admin",
    "roleType": 3,
    "id": 4
  },
  {
    "title": "解决react Maximum",
    "category": "react",
    "time": "2019-10-14",
    "tag": "react bug",
    "content": "<p>Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.</p>\n<p>今天用react开发微信公众号的时候，竟然发生了如下错误？好吧！记录一下，避免以后再也不范这种低级错误。。。</p>\n<p></p>\n<p></p>\n<p>1.找出问题</p>\n<p>ok，先找到发生错误的根源</p>\n<p></p>\n<p></p>\n<p>原文链接：https://blog.csdn.net/qq_34477855/article/details/86008010</p>\n",
    "author": "admin",
    "roleType": 3,
    "id": 5
  },
  {
    "title": "flux介绍",
    "category": "react",
    "time": "2019-10-18",
    "tag": "flux",
    "content": "<p style=\"text-align:start;\"><span style=\"color: rgb(75,75,75);background-color: rgb(255,255,255);font-size: 16px;font-family: Segoe UI\", SegoeUI, \"Microsoft YaHei\", 微软雅黑, \"Helvetica Neue\", Helvetica, Arial, sans-serif;\">　Flux是Facebook用户建立客户端Web应用的前端架构， 它通过利用一个单向的数据流补充了React的组合视图组件，这更是一种模式而非正式框架，你能够无需许多新代码情况下立即开始使用Flux。</span></p>\n<p style=\"text-align:start;\"><span style=\"color: rgb(75,75,75);background-color: rgb(255,255,255);font-size: 16px;font-family: Segoe UI\", SegoeUI, \"Microsoft YaHei\", 微软雅黑, \"Helvetica Neue\", Helvetica, Arial, sans-serif;\">　　Flux应用有三个主要部分：Dispatcher调度 、存储Store和视图View(React 组件)，这些不应该和MVC:Model-View-Controll(模型-视图-控制器)混淆，控制器在Flux应用中是存在的，但是他们是controller-view(控制器-视图)，视图通常在一个结构顶部，而这种结构是用来从存储stroe获得数据，然后将数据传递到自己的子结构们，此外，Action创建者-Dispatcher的帮助类的方法 -用于支持一个语义API，这个API是描述应用程序中所有变化的可能，通常可将它们看成是Flux更新循环的第四部分。</span></p>\n<p style=\"text-align:start;\"><span style=\"color: rgb(75,75,75);background-color: rgb(255,255,255);font-size: 16px;font-family: Segoe UI\", SegoeUI, \"Microsoft YaHei\", 微软雅黑, \"Helvetica Neue\", Helvetica, Arial, sans-serif;\">　　Flux是以单向数据流方式支持MVC，当一个用户和React视图交互时，视图会将这个动作传播到一个中央Dispatcher，一直到各种村粗，在那里保存着应用的数据和业务逻辑，这个使用React的声明式风格的过程是非常棒的，能够允许存储发送更新信息，而无需指定在状态之间如何切换视图。(传统方式更新状态后，会推出一个新的视图页面。)</span></p>\n<p style=\"text-align:start;\"><span style=\"color: rgb(75,75,75);background-color: rgb(255,255,255);font-size: 16px;font-family: Segoe UI\", SegoeUI, \"Microsoft YaHei\", 微软雅黑, \"Helvetica Neue\", Helvetica, Arial, sans-serif;\">　　Flux最初是用于正确导出数据，比如如果我们要显示一系列消息的未读数字，而另外一个视图显示的是所有消息，其中未读的消息会高亮显示。这种情况使用MVC很难处理，将一个消息变为已读状态需要更新消息模型，然后再需要更新未读的计数模型(将未读模型数字减1，因为刚发生一个已读改变)，这种依赖和级联更新经常发生在大型MVC应用，导致一个混乱的数据流编织和不可预知的结果。</span></p>\n<p style=\"text-align:start;\"><span style=\"color: rgb(75,75,75);background-color: rgb(255,255,255);font-size: 16px;font-family: Segoe UI\", SegoeUI, \"Microsoft YaHei\", 微软雅黑, \"Helvetica Neue\", Helvetica, Arial, sans-serif;\">　　控制器被存储反转控制：存储接受更新，适当地调节这些更新，而不是一致地依赖外部更新其数据，存储之外根本不知道它是如何管理领域数据的，这有助于实现一种清晰的分离关注。存储并没有直接的类似setAsRead()之类的方法，而是只有一个单一方式获取数据到其自成一体的世界中，这个方式就是回调，注册在dispatcher中的callback。</span>&nbsp;</p>\n",
    "author": "andy",
    "roleType": 1,
    "id": 6
  },
  {
    "title": "express",
    "tag": "express基础",
    "category": "node.js",
    "time": "2020-03-24",
    "content": "<p>express基础</p>\n",
    "author": "admin",
    "roleType": 3,
    "id": 7
  },
  {
    "title": "闭包",
    "tag": "闭包",
    "category": "javaScript",
    "time": "2020-03-23",
    "content": "<p>闭包</p>\n",
    "author": "admin",
    "roleType": 3,
    "id": 8
  },
  {
    "title": "模块化开发",
    "tag": "模块化开发",
    "category": "javaScript",
    "time": "2019-12-15",
    "content": "<p>模块化开发</p>\n",
    "author": "admin",
    "roleType": 3,
    "id": 9
  },
  {
    "title": "模版语法",
    "tag": "模版语法",
    "category": "javaScript",
    "time": "2020-01-13",
    "content": "<p>模版语法</p>\n",
    "author": "admin",
    "roleType": 3,
    "id": 10
  },
  {
    "title": "自定义事件",
    "tag": "自定义事件",
    "category": "javaScript",
    "time": "2020-01-08",
    "content": "<p>自定义事件</p>\n",
    "author": "admin",
    "roleType": 3,
    "id": 11
  },
  {
    "title": "性能优化",
    "tag": "性能优化",
    "category": "javaScript",
    "time": "2020-02-18",
    "content": "<p>性能优化</p>\n",
    "author": "admin",
    "roleType": 3,
    "id": 12
  },
  {
    "title": "mongdb",
    "tag": "mongdb",
    "category": "node.js",
    "time": "2020-02-28",
    "content": "<p>mongdb</p>\n",
    "author": "admin",
    "roleType": 3,
    "id": 13
  },
  {
    "title": "jsx",
    "tag": "jsx",
    "category": "react",
    "time": "2020-03-08",
    "content": "<p>jsx</p>\n",
    "author": "admin",
    "roleType": 3,
    "id": 14
  },
  {
    "title": "keep-alive",
    "tag": "keep-alive",
    "category": "vue",
    "time": "2020-02-23",
    "content": "<p>keep-alive</p>\n",
    "author": "admin",
    "roleType": 3,
    "id": 15
  },
  {
    "title": "node基础",
    "tag": "node基础",
    "category": "node.js",
    "time": "2019-12-28",
    "content": "<p>node基础</p>\n",
    "author": "admin",
    "roleType": 3,
    "id": 16
  },
  {
    "title": "缓存",
    "tag": "缓存",
    "category": "vue",
    "time": "2020-02-19",
    "content": "<p>缓存</p>\n",
    "author": "admin",
    "roleType": 3,
    "id": 17
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
  colName: Articles,
  where: {
    author:'admin'
  }
}).then(data => {
  if (data.length === 0 || data === undefined) {
    sql.insert({
      colName: Articles,
      data: oldArticle
    })
  }
})

router.get('/', function (req, res, next) {
 const {_id} = req.query
 if(_id===undefined){
  sql.find({
    colName: Articles,
  })
    .then(data => {
      res.send(data)
    })
 }else{
  sql.find({
    colName: Articles,
    where:{_id:_id}
  })
    .then(data => {
      res.send(data[0])
    })
 }
});

router.post('/', function (req, res, next) {
  sql.insert({
    colName: Articles,
    data: req.body
  }).then(data => {
    res.send({
      code: 11,
      message: 'insert ok '
    })
  })
});

router.put('/', function (req, res, next) {
  sql.update({
    colName: Articles,
    where: {
      _id: req.body._id
    },
    newdata: req.body
  }).then(() => {
    res.send({
      code: 21,
      message: 'update ok'
    })
  })
});

router.delete('/', function (req, res, next) {
  sql.delete({
    colName: Articles,
    where: req.body
  }).then(() => {
    res.send({
      code: 31,
      message: 'delete ok'
    });
  })
});


module.exports = router;
