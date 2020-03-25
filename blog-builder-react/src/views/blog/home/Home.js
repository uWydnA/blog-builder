import React, { Component } from 'react'
import { Layout, Row, Col, List, Avatar, Card, Tag } from 'antd';
import Banner from '../banner/Banner'
import './home.css'
import { TagOutlined, ClockCircleOutlined, UserOutlined, AppstoreFilled, TagFilled } from '@ant-design/icons';
import Cardbar from '../cardbar/Cardbar'
import {connect} from 'react-redux'
const { Content, Footer } = Layout;

class Home extends Component {
  state = {
    data: [],
    catelist: [],
    taglist: []
  }
  UNSAFE_componentWillMount() {
    React.$axios.get('http://api.yolandy.com/api/articles')
      .then(res => {
        this.setState({
          data: res.data,
          taglist: [...new Set(res.data.map(val => val.tag))]
        }, () => {
          let newarr = [...new Set(this.state.data.map(val => val.category))].map(val => ({ category: val }))
          this.state.data.forEach(val => {
            newarr.forEach(item => {
              if (val.category === item.category) {
                item.num = ++item.num || 1
              }
            })
          })
          this.setState({
            catelist: newarr
          },()=>{
            this.props.actionCreator(false)
          })
        })
      })
  }
  componentWillUnmount () {
    this.props.actionCreator(true)
  }
  goTag = tag => {
    this.props.history.push(`/tag/${tag}`)
  }
  render() {
    const IconText = ({ icon, text }) => (
      <span>
        {React.createElement(icon, { style: { marginRight: 8 } })}
        {text}
      </span>
    );
    const colorTag = ['#F8B26A', '#E15B64', "#67CC86", "#3498DB"]
    return (
      <Layout className="layoutHome blogHome" style={{ height: '100%', color: '#fff', display: 'block',visibility:this.props.isLoading ?'hidden':'visible' }}>
        <Banner></Banner>
        <Content style={{ padding: '0 50px', background: '#202124', height: 'auto', minHeight: 'auto' }}>
          <div className="site-layout-content" style={{ background: '#202124' }}>
            <Row>
              <Col span={16}>
                <List
                  itemLayout="vertical"
                  size="large"
                  pagination={{
                    onChange: page => {
                      console.log(page);
                    },
                    pageSize: 10,
                  }}
                  dataSource={this.state.data}
                  renderItem={item => (
                    <List.Item
                      key={item.title}
                      actions={[
                        <IconText icon={UserOutlined} text={item.author} key="list-vertical-star-o" />,
                        <IconText icon={ClockCircleOutlined} text={item.time} key="list-vertical-like-o" />,
                        <div className='goTag' onClick={this.goTag.bind(this,item.tag)}>
                          <TagOutlined/>
                          &nbsp;  
                          <span>{item.tag}</span>
                        </div>
                      ]}
                    >
                      <List.Item.Meta
                      onClick={()=>{
                        this.props.history.push(`/detail/${item.category}/${item._id}`)
                      }}
                        title={<a href={item.href}>{item.title}</a>}
                      />
                    </List.Item>
                  )}
                />
              </Col>
              <Col span={8}>
                <div className='carbar'>
                  <Cardbar data={this.state.data} catelist={this.state.catelist}></Cardbar>
                  <div className='catagory'>
                    <AppstoreFilled />
                    <span style={{ marginLeft: '5px' }}>分类</span>
                  </div>
                  <div className="catalist">
                    {
                      this.state.catelist.map(val => (
                        <Card key={val.category} style={{ width: 'auto' }} onClick={()=>{
                          this.props.history.push(`/category/${val.category}`)
                        }}>
                          <span className='left' >{val.category}</span>
                          <Tag className='right' color={colorTag[parseInt(Math.random() * 4)]}>{val.num}</Tag>
                        </Card>
                      ))
                    }
                  </div>
                  <div className='catagory'>
                    <TagFilled />
                    <span style={{ marginLeft: '5px' }}>标签</span>
                  </div>
                  <div className='taglist'>
                    {
                      this.state.taglist.map(val => (
                        <Tag key={val}  onClick={this.goTag.bind(this,val)} style={{ margin: '.4rem .2rem', borderRadius: '.3rem' }} color={colorTag[parseInt(Math.random() * 4)]}>{val}</Tag>
                      ))
                    }
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center', background: '#202124' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    )
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

export default connect(mapStateToProps,mapDispatchToProps)(Home);