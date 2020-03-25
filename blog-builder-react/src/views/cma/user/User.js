import React, { Component } from 'react'
import { Table, Button, Switch, Modal, Form, Input, Select } from 'antd';
import { FormOutlined, DeleteOutlined } from '@ant-design/icons';
import './user.css'
import store from '../../../redux/store';
const { Option } = Select;
class User extends Component {
  state = {
    columns: [
      { title: '角色名称', dataIndex: 'roleName', key: 'roleName' },
      { title: '用户名', dataIndex: 'username', key: 'username' },
      {
        title: '用户状态',
        dataIndex: 'roleState',
        key: 'roleState',
        render: (data, item) => {
          return (
            <Switch disabled={item.default} defaultChecked={data} onClick={(checked) => this.handleSwitch(checked, item)} />
          )
        }
      },
      {
        title: '操作',
        dataIndex: '',
        key: 'x',
        render: item => {
          return (
            <div>
              <Button type="primary" icon={<FormOutlined />} shape="circle" disabled={item.default} onClick={() => this.handleUpdate(item.id)}></Button>
                            &nbsp;
              <Button type="danger" icon={<DeleteOutlined />} shape="circle" disabled={item.default} onClick={() => this.handelDelete(item.id)}></Button>
            </div>
          )
        }
      },
    ],
    data: [],
    pageNumber: 5,  //   设置每页显示几条数据
    visible: false,
    roleList: [],
    roleType: 1,
    userInfo: null,
    ADDorUPDATE: true
  }

  // actionUser = () => {
  //   return React.$axios.get('http://localhost:12138/users').then(res => {
  //     return {
  //       type: 'SetUserList',
  //       payload: res.data
  //     }
  //   })
  // }

  actionRole = () => {
    return React.$axios.get('http://localhost:12138/roles').then(res => {
        return {
          type: 'SetRoleList',
          payload: res.data
        }
    })

  }



  componentDidMount(){

    React.$axios.get('http://localhost:12138/users').then(res => {
      // console.log(res.data)
      this.setState({
          data: res.data
      })
  })


    // if (store.getState().userList.SetUserList.length === 0) {
    //   store.dispatch(this.actionUser()).then(
    //     data => {
    //       // console.log(data)
    //       this.setState({
    //         data: store.getState().userList.SetUserList
    //       })
    //     })
    // } else {
    //   console.log("SetUserList使用缓存")
    //   this.setState({
    //     data: store.getState().userList.SetUserList
    //   })
    // }



    // 请求角色名称，
    if (store.getState().userList.SetRoleList.length === 0) {
      store.dispatch(this.actionRole()).then(
        data => {
          // console.log(data)
          this.setState({
            roleList: store.getState().userList.SetRoleList
          })
        })
    } else {
      console.log("SetRoleList使用缓存")
      this.setState({
        roleList: store.getState().userList.SetRoleList
      })
    }
  }

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>添加用户</Button>
        <Table
          columns={this.state.columns}
          dataSource={this.state.data}
          pagination={{ pageSize: this.state.pageNumber }}
          rowKey={item => {
            return item.id
          }} //设置key值
        />
        <Modal
          visible={this.state.visible}
          onOk={
            this.state.ADDorUPDATE ? this.AddOk : this.UpdateOk
          }
          onCancel={this.handleCancel}
        >

          <Form
            ref='AddUser'
            layout="vertical"
            name="form_in_modal"
            initialValues={{ modifier: 'public' }}
          >
            <Form.Item
              name="username"
              label="用户名"
              rules={[{ required: true, message: 'Please input username' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="密码"
              rules={[{ required: true, message: 'Please input password' }]}
            >
              <Input type='password' />
            </Form.Item>
            <Form.Item
              name='roleName'
              label='选择角色'
              rules={[{ required: true, message: 'Please Role selection' }]}
            >
              <Select
                onChange={this.handleChange}
                placeholder='请选择角色'
                allowClear={true}
              >
                {/* 从数据库取的数据动态渲染角色列表 */}
                {
                  this.state.roleList.map(item => {
                    return <Option value={item.roleName} key={item.id}>{item.roleName}</Option>
                  })
                }
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }

  // switch开关设置
  handleSwitch = (checked, item) => {
    React.$axios.put(`http://localhost:12138/users/${item.id}`, {
      ...item,
      roleState: checked
    }).then(res => {
      // switch开关操作即体现在页面，只需要更改数据库对应的数据
      // console.log(res.data)
    })
  }



  //  点击修改用户信息，弹出信息框，并将原信息渲染在输入框内
  handleUpdate = id => {
    this.setState({
      // 设置弹出框的ok功能是添加用户还是更新用户,true为添加用户，false为更新用户,初始为true
      ADDorUPDATE: false,
      // 将信息状态设置为true显示
      visible: true,
      userInfo: this.state.data.filter(item => (item.id === id))[0],
      roleType: this.state.data.filter(item => (item.id === id))[0].roleType
    }, () => {
      // 设置延时器将异步请求改变成同步请求
      var { username, password, roleName } = this.state.userInfo
      setTimeout(() => {
        this.refs.AddUser.setFieldsValue({
          username,
          password,
          roleName
        })
      }, 0)
      // console.log('修改信息',this.state.ADDorUPDATE,this.state.userInfo)
    })
  }

  // 通过ajax的put修改用户信息并渲染页面
  UpdateOk = () => {

    this.refs.AddUser.validateFields().then(value => {
      // value => 输入框的值
      React.$axios.put(`http://localhost:12138/users/${this.state.userInfo.id}`, {
        ...this.state.userInfo,
        ...value,
        roleType: this.state.roleType
      }).then(res => {
        // console.log(res.data)
        var newData = this.state.data.map(item => {
          if (item.id === this.state.userInfo.id) {
            return res.data
          } else {
            return item
          }
        })

        this.setState({
          visible: false,
          data: newData
        })
      })

    })
  }


  // 删除用户 ,将每条数据的唯一id传入事件中，进行ajax
  handelDelete = id => {
    // console.log(id)
    React.$axios.delete(`http://localhost:12138/users/${id}`).then(res => {
      // 返回一个空对象
      // console.log(res.data) 
      // 重新将data赋值，渲染页面数据，filter过滤，返回为true的值
      this.setState({
        data: this.state.data.filter(item => {
          return item.id !== id
        })
      })
    })
  }


  handleChange = (value) => {
    // 获取选择框的值
    // console.log(`selected ${value}`)
    var arr = ['小编', '管理员', '超级管理员']
    this.setState({
      roleType: arr.indexOf(value) + 1
    })
  }


  showModal = () => {
    this.setState({
      visible: true,
      ADDorUPDATE: true
    }, () => {
      setTimeout(() => {
        // 重置输入框内容
        this.refs.AddUser.resetFields()
      }, 0)
      // console.log('添加信息',this.state.ADDorUPDATE)
    });

  };

  // 添加用户
  AddOk = (e) => {
    this.refs.AddUser.validateFields().then(values => {
      //   values:{username: 'username',password: 'password'}
      //  每次添加数据完成后重置表单输入框为初始状态
      this.refs.AddUser.resetFields()
      React.$axios.post('http://localhost:12138/users', {
        ...values,
        roleType: this.state.roleType,
        roleState: false
      }).then(res => {
        // console.log(res.data)
        // 返回的数据是新添加的数据，不包含原数据，所以需要将新添加的数据合并到原数据中，再渲染页面
        this.setState({
          data: [...this.state.data, res.data]
        })
      })
    }).catch(errorInfo => {
      console.log(errorInfo)
    })
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };
}

export default User



