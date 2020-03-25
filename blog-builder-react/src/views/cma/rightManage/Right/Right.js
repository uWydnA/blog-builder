import React, { Component } from 'react'
import './right.css'
import { Table, Tag, Button, Modal, Select, Form } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import store from '../../../../redux/store'

const { Option } = Select
export default class Right extends Component {

  actionCreate = () => {
    return (dispatch) => {
      React.$axios.get("http://localhost:12138/rights").then(res => {
        dispatch({
          type: 'right',
          payload: res.data
        })
      })
    }
  }

  componentDidMount() {
    if (store.getState().rightList.length === 0) {
      store.dispatch(this.actionCreate())
    } else {
      this.setState({
        data: store.getState().rightList
      })
    }
    this.unscribe = store.subscribe(() => {
      this.setState({
        data: store.getState().rightList
      })
    })
  }
  componentWillUnmount() {
    this.unscribe();
  }


  // componentDidMount() {
  //   React.$axios.get("http://localhost:12138/rights").then(res => {
  //     // console.log(res.data);
  //     this.setState({
  //       data: res.data
  //     })
  //   })
  // }

  state = {
    myGrade: '',
    formdata: "",
    visible: false,
    columns: [
      {
        title: '#',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '权限名称',
        dataIndex: 'title',
        key: 'title'
      },
      {
        title: '权限等级',
        dataIndex: 'grade',
        key: 'grade',
        render: item => {
          var arr = ["green", "blue", "volcano"]
          return (
            <Tag color={arr[item - 1]}>{item}</Tag>
          )
        }
      },
      {
        title: '修改权限',
        dataIndex: '',
        key: 'x',
        render: (item) => <div>
          <Button type="primary" shape="circle" icon={<EditOutlined />} disabled={item.default} onClick={() => { this.update(item.id) }} />
        </div>
      }
    ],
    data: []
  }

  update = (data) => {
    var formdata = this.state.data.filter(item => item.id === data)
    // console.log(formdata[0]);
    this.setState({
      formdata: formdata[0],
      visible: true,
      myGrade: formdata[0].grade
    })
    let { grade } = formdata[0]
    this.refs.updateText && this.refs.updateText.setFieldsValue({
      grade
    })
  }

  onChange = (value) => {
    console.log(value);
    this.setState({
      myGrade: value
    })
  }

  handleUpdateOk = () => {
    this.refs.updateText.validateFields().then(value => {
      // console.log(value, this.state.formdata);
      React.$axios.put(`http://localhost:12138/rights/${this.state.formdata.id}`, {
        ...this.state.formdata,
        ...value
      }).then(res => {
        var newlist = this.state.data.map(item => {
          if (item.id === this.state.formdata.id) {
            return res.data
          } else {
            return item
          }
        })
        this.setState({
          visible: false,
          data: newlist
        })
      })
    })
  }

  render() {
    return (
      <div>
        <Table columns={this.state.columns} dataSource={this.state.data}
          pagination={{ pageSize: 5 }} />
        <Modal
          title="更新用户"
          visible={this.state.visible}
          onOk={this.handleUpdateOk}
          okText="提交"
          cancelText="取消"
          onCancel={() => {
            this.setState({
              visible: false
            })
          }}
        >
          <Form
            layout="vertical"
            name="form_in_modal"
            ref="updateText"
            initialValues={this.state.formdata}>
            <Form.Item name="grade" label="权限等级"
              rules={[{ required: true, message: 'Please input the title of collection!' }]}>
              <Select
                showSearch
                placeholder="请选择权限等级"
                optionFilterProp="children"
                onChange={this.onChange}
                onSearch={this.onSearch}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value="1">1</Option>
                <Option value="2">2</Option>
                <Option value="3">3</Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}
