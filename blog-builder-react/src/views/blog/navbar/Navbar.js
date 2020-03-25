import React, { Component } from 'react'
import { Layout, Menu, Input, Button } from 'antd';
import './navbar.css'
import { withRouter } from 'react-router-dom';
import {
  AppstoreOutlined,
  ClockCircleOutlined,
  TagOutlined,
  HomeOutlined,
  CommentOutlined,
  // ExperimentOutlined

} from '@ant-design/icons';
const { Search } = Input;
const { Header } = Layout;
const { SubMenu } = Menu;
class Navbar extends Component {
  handleClick = item => {
    this.props.history.push(item.key)
  }
  state = {
    data: [],
    findData: [],
    cataList: [],
    isFocused: false
  }
  UNSAFE_componentWillMount() {
    React.$axios.get('http://api.yolandy.com/api/articles')
      .then(res => {
        this.setState({
          data: res.data,
          cataList: [...new Set(res.data.map(val => val.category))]
        })
      })
  }
  subHandle = val => {
    this.props.history.push(`/category/${val}`)
  }
  focusSearch = () => {
    this.setState({
      isFocused: true,
    })
  }
  blurSearch = () => {
    this.setState({
      isFocused: false,
    })
  }
  searchChange = value => {
    this.setState({
      findData: this.state.data.filter(val => {
        if (value.target.value.length === 0) {
          return false
        } else {
          return val.title.includes(value.target.value) || val.tag.includes(value.target.value) || val.category.includes(value.target.value)
        }
      })
    })

  }
  render() {
    return (
      <div className='blogHeader'>
        <Header style={{ width: '100%', background: '#202124' }}>
          <div className='bloglogo'>
            梁朝伟
          </div>
          <div className='blogmenu'>
            <Menu
              theme="light"
              mode="horizontal"
              className='blogMenu'
              defaultSelectedKeys={['/home']}
              style={{ background: '#202124', fontWeight: '500', fontSize: '.9rem' }}
            >
              <Menu.Item key="/home" onClick={this.handleClick}>
                <HomeOutlined />
                <span>Home</span>
              </Menu.Item>
              <SubMenu
                title={
                  <span className="submenu-title-wrapper">
                    <AppstoreOutlined />
                    category
            </span>
                }
              >
                {
                  this.state.cataList.map(val => (
                    <Menu.Item key={val} onClick={this.subHandle.bind(this, val)}>{val}</Menu.Item>
                  ))
                }
              </SubMenu>
              <Menu.Item key="/tag" onClick={this.handleClick}>
                <TagOutlined />
                <span>Tag</span>
              </Menu.Item>
              <Menu.Item key="/timeline" onClick={this.handleClick}>
                <ClockCircleOutlined />
                <span>timeline</span>
              </Menu.Item>
              <SubMenu
                title={
                  <span className="submenu-title-wrapper">
                    <CommentOutlined />
                    contact
            </span>
                }
              >
                <Menu.Item key='github'>github</Menu.Item>
                <Menu.Item key='博客园'>博客园</Menu.Item>
              </SubMenu>
            </Menu>
          </div>
          <div className='search' id='blogSearch' style={{ overflow: 'hidden', float: 'right' }}>
            <Search
              ref='search'
              onFocus={this.focusSearch}
              onBlur={this.blurSearch}
              onChange={this.searchChange}
              className={this.state.isFocused ? 'foucsSearch' : 'blurSearch'}
              style={{ width: 200 }}
            />

          </div>
          {
            this.state.findData.length >= 1 ?
              <ul className='searchDemo' style={{ left: 375 }}>
                {
                  this.state.findData.map(val => (
                    <li onClick={() => {
                      this.setState({
                        isFocused:false,
                        findData:[]
                      })
                      document.querySelector(".search .ant-input").value=''
                      this.props.history.push(`/detail/${val.category}/${val.title}`);
                    }} key={val.title}>{val.category} > {val.title}</li>
                  ))
                }
              </ul>
              : null
          }

          {/* <div className='changeTheme'>
            <Popover content={content} title="Choose mode" trigger="click">
              <Button shape="circle" icon={<ExperimentOutlined />} style={{ background: 'transparent', border: '0', fontSize: '1.5rem', height: 'auto', color: '#3eaf7c' }}>
              </Button>
            </Popover>
          </div> */}
        </Header>
      </div>
    )
  }
}
export default withRouter(Navbar)
