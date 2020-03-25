import React, { Component } from 'react'
import { Tag } from 'antd';

export default class Home extends Component {
  render() {
    return (
      <div>
         <Tag>react</Tag>
         <Tag>react-router</Tag>
         <Tag>react-redux</Tag>
         <Tag>andt</Tag>
        这是一个博客后台管理系统，基于react+react-router+react-redux+andt开发
      </div>
    )
  }
}
