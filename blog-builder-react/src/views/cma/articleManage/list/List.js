import React, { Component } from 'react'
import { Table, Button } from 'antd';
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons'
import './list.css'
export default class List extends Component {
  state = {
    columns: [
      {
        title: '文章标题',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: '文章作者',
        dataIndex: 'author',
        key: 'author',
      },
      {
        title: '文章类型',
        dataIndex: 'category',
        key: 'category',
      },
      {
        title: '文章标签',
        dataIndex: 'tag',
        key: 'tag',
      },
      {
        title: '提交时间',
        dataIndex: 'time',
        key: 'time',
      },
      {
        title: '操作',
        key: 'action',
        render: (val, item) => (
          < div >
            <Button type="primary" onClick={this.see.bind(this, item._id)} shape="circle" icon={<EyeOutlined />} />
            &nbsp;
            <Button type="primary" onClick={this.update.bind(this, item._id)} shape="circle" icon={<EditOutlined />} />
            &nbsp;
            <Button type="danger" onClick={this.delete.bind(this, item._id)} shape="circle" icon={<DeleteOutlined />} />
          </div >
        )
      },
    ],
    data: []
  }
  see = (id) => {
    this.props.history.push(`/cma/article-manage/preview/${id}`)
  }
  update = (id) => {
    this.props.history.push(`/cma/article-manage/update/${id}`)
  }
  delete = (id) => {
      React.$axios.delete(`http://api.yolandy.com/api/articles`,{
       data:{_id:id}
      })
      .then(res=>{
        this.setState({
          data:this.state.data.filter(val=>val._id!==id)
        })
      })
  }
  UNSAFE_componentWillMount() {
    React.$axios.get('http://api.yolandy.com/api/articles')
      .then(res => {
        this.setState({
          data: res.data
        })
      })
  }
  render() {
    return (
      <div>
        <div className='btn'>
          <Button type="primary" onClick={()=>{
            this.props.history.push('/cma/article-manage/addArticle')
          }}>添加文章</Button>
        </div>
        <Table
          rowKey={item => item._id}
          columns={this.state.columns}
          dataSource={this.state.data}
        />
      </div>
    )
  }
}
