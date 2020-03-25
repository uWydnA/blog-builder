import React, { Component } from 'react'
import { Layout, Menu, Dropdown, Avatar } from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import './topheader.css'
const { Header } = Layout;

class Topheader extends Component {
  state = {
    collapsed: false,
    users: {}
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    }, () => {
      this.props.actionCreator(this.state.collapsed)
    })
  }
  componentDidMount () {
    let users = localStorage.getItem('users')
    console.log(JSON.parse(decodeURIComponent(window.atob(users))))
    this.setState({
      users: JSON.parse(decodeURIComponent(window.atob(users)))
    })
  }
  //下拉菜单
  menu () {
    return (
        <Menu>
            <Menu.Item>
                <div>
                    {this.state.users.roleName}
                </div>
            </Menu.Item>
            <Menu.Item>
                <div onClick={ this.signOut }>
                    退出
                </div>
            </Menu.Item>
        </Menu>
    )
  }  
  render() {
    return (
      <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: this.toggle,
          })}

          <div style={ {float:'right',padding:'0 10px'} }>
              欢迎{this.state.users.username}回来！
              <Dropdown overlay={ this.menu() }>
                  <Avatar size="large" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1585021049123&di=fb679643cac9ae0b8b1edffa61bdf2c1&
                  imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180414%2F5fd4bd19639842c884d48b37d43a2eea.jpeg" />
              </Dropdown>
          </div>
      </Header>
    )
  }
  signOut = () => {
    localStorage.setItem('token', '')
    this.props.history.push('/login')
  }
}

const mapStateToProps = state=>{
  return {

  }
}

const mapDispatchToProps = {
  actionCreator : (data)=>{
    return {
      type:'MySideMenuCollapsed',
      payload:data
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Topheader))
