import React, { Component } from 'react'
import { PageHeader, Steps, Button, message, Input, Form, Select } from 'antd';
import RichEditor from '../richEditor/RichEditor'
const { Step } = Steps;
const { Option } = Select;
export default class Update extends Component {
  UNSAFE_componentWillMount() {
    React.$axios.get(`http://api.yolandy.com/api/category`)
      .then(res => {
        this.setState({
          categoryist: res.data
        })
      })
  }
  state = {
    data: {},
    categoryist: [],
    steps: [
      {
        title: '编辑分类',
      },
      {
        title: '修改文章',
      },
      {
        title: '完成提交',
      },
    ],
    current: 0,
    content: '',
    categoryData: {}
  }
  next = () => {
    if (this.state.current === 0) {
      this.refs.updateForm.validateFields()
        .then(res => {
          if (res) {
            this.setState({
              categoryData: res
            })
            const current = this.state.current + 1;
            this.setState({ current });
          }
        })
      return;
    }
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev = () => {
    const current = this.state.current - 1;
    this.setState({ current });
  }
  genContent = (data) => {
    this.setState({
      content: data
    })
  }
  submit = () => {
    React.$axios.post(`http://api.yolandy.com/api/articles`, {
      ...this.state.categoryData,
      content: this.state.content,
      author: JSON.parse(decodeURIComponent(atob(localStorage.getItem('users')))).username,
      roleType: JSON.parse(decodeURIComponent(atob(localStorage.getItem('users')))).roleType,
    })
      .then(res => {
        message.success('添加成功')
        this.props.history.push('/cma/article-manage/list')
      })
  }
  render() {
    const layout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 22 },
    };
    return (
      <div>
        <div >
          <PageHeader
            className="site-page-header"
            onBack={() => {
              this.props.history.goBack()
            }}
            title={this.state.data.title}
          // subTitle="This is a subtitle"
          />
        </div>
        <div >
          <div style={{ marginBottom: '25px' }}>
            <Steps current={this.state.current}>
              {this.state.steps.map(item => (
                <Step key={item.title} title={item.title} />
              ))}
            </Steps>
          </div>
          <div className="steps-content" style={{ display: this.state.current === 0 ? 'block' : 'none' }}>{
            <Form
              {...layout}
              ref='updateForm'
              name="basic"
              initialValues={{ remember: true }}
            >
              <Form.Item
                label="文章标题"
                name="title"
                rules={[{ required: true, message: '请输入你的文章标题' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="文章标签"
                name="tag"
                rules={[{ required: true, message: '请输入你的文章标签' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="文章分类"
                name="category"
                rules={[{ required: true, message: '输入你的文章分类' }]}
              >
                <Select
                  showSearch
                  style={{ width: '100%' }}
                  placeholder="选择一个分类"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {
                    this.state.categoryist.map(val => (
                      <Option value={val.title} key={val.title}>{val.title}</Option>
                    ))
                  }

                </Select>
              </Form.Item>
              <Form.Item
                label="提交时间"
                name="time"
                rules={[{ required: true, message: '请输入你的提交时间' }]}
              >
                <Input />
              </Form.Item>
            </Form>
          }</div>
          <div className="steps-content" style={{ display: this.state.current === 1 ? 'block' : 'none' }}>
            <RichEditor genContent={this.genContent} ></RichEditor>
          </div>
          <div className="steps-content" style={{ display: this.state.current === 2 ? 'block' : 'none' }}></div>
          <div className="steps-action">
            {this.state.current < this.state.steps.length - 1 && (
              <Button type="primary" onClick={() => this.next()}>
                下一步
              </Button>
            )}
            {this.state.current === this.state.steps.length - 1 && (
              <Button type="primary" onClick={() => { this.submit() }}>
                提交
              </Button>
            )}
            {this.state.current > 0 && (
              <Button style={{ margin: 8 }} onClick={() => this.prev()}>
                上一步
              </Button>
            )}
          </div>
        </div>
      </div>
    )
  }
}
