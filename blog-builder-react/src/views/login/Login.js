import React, { Component } from 'react'
import Particles from 'react-particles-js'
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {connect} from 'react-redux'
import './Login.css'

class Login extends Component {
  componentWillMount () {
    this.props.actionCreator(false)
  }
  componentWillUnmount () {
    this.props.actionCreator(true)
  }
    render() {
        return (
          <div style={{ background: 'rgb(35, 39, 65)' }}>
              <Particles height={document.documentElement.clientHeight - 6 + 'px'} />
              <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={this.onFinish}
              >
                  <Form.Item
                    name="username"
                    validateTrigger='onBlur'
                    rules={[{ required: true, message: '*请输入你的账户名'}]}
                  >
                      <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="账户名" id="error"/>
                  </Form.Item>

                  <Form.Item
                    name="password"
                    validateTrigger='onBlur'
                    rules={[{ required: true, message: '*请输入你的密码' }]}
                  >
                      <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        placeholder="密码"
                      />
                  </Form.Item>

                  <Form.Item name="remember" valuePropName="checked" noStyle>
                      <Checkbox style={{ color: '#1890ff', marginBottom: '20px'}}>记住账户</Checkbox>
                  </Form.Item>

                  <Form.Item>
                      <Button type="primary" htmlType="submit" className="login-form-button">
                        登录
                      </Button>
                  </Form.Item>
              </Form>
          </div>
        )
    }
    onFinish = values => {
      React.$axios({
        url: `http://localhost:12138/users?username=${values.username}&
            password=${values.password}&roleState=true`,
        method: 'Get'
      }).then(res => {
          if (  res.data.length )  {

            message.success('登录成功')
              
            let user = window.btoa(encodeURIComponent(JSON.stringify(res.data[0])))
          
            // 解码：decodeURIComponent(window.atob(user))
            localStorage.setItem('users', user)
            localStorage.setItem('token', true)

            this.props.history.push('/cma')

          } else {
            message.error('登录失败')
          }
      })
    }
}

const mapStateToProps = state=>{
  return {
    isLoading:state.isLoading
  }
}

const mapDispatchToProps = {
  actionCreator : data=>{
    return {
      type:'loading',
      payload:data
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);