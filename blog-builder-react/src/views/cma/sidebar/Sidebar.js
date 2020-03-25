import React, { Component } from 'react'
import { withRouter} from 'react-router-dom'
import { Layout, Menu } from 'antd';
import {connect} from 'react-redux'
import menu from '../../../router/menu'
const {SubMenu} = Menu
const { Sider } = Layout;
class Sidebar extends Component {
  state={
    menulist:[],
    roleType:''
  }
  componentWillMount() {
    this.setState({
      menulist: menu.superAdmin,
      roleType:JSON.parse(decodeURIComponent(atob(localStorage.getItem('users')))).roleType
    })
  }
  showList = (data) => {
    return data.map((val, index) => (
      val.children ?
        <SubMenu
          key={val.path}
          title={
            <span>
              <val.icon />
              <span>{val.title}</span>
            </span>
          }
        >
          {
            this.showList(val.children.filter(val => val.roleType <= this.state.roleType))
          }
        </SubMenu>
        :
        <Menu.Item key={val.path} onClick={this.handleClick}>
          <val.icon />
          <span>{val.title}</span>
        </Menu.Item>
    ))
  }
  handleClick = (item)=>{
    this.props.history.push(item.key);
  }
  render() {
    return (
      <Sider trigger={null} collapsible collapsed={this.props.collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultOpenKeys={['/' + this.props.location.pathname.split('/')[1] + '/' + this.props.location.pathname.split('/')[2]]} selectedKeys={[this.props.location.pathname]}>
          {
            this.showList(this.state.menulist.filter(val => val.roleType <= this.state.roleType))
          }
        </Menu>
      </Sider>
    )
  }
}

const mapStateToProps = state=>{
  return {
    collapsed : state.isCollapsed
  }
}

export default withRouter(connect(mapStateToProps)(Sidebar))