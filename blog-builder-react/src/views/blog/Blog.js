import React, { Component } from 'react'
import { Layout } from 'antd';
import Navbar from './navbar/Navbar'
import './Blog.css'
import {connect} from 'react-redux'

class Blog extends Component {
  
  render() {
    return (
      <div style={{height:'100%',display:this.props.isLoading?'none':'block'}}>
        <Layout className="layout" style={{height:'100%'}}>
          <Navbar></Navbar>
          {
            this.props.children
          }
        </Layout>
      </div>
    )
  }
}
const mapStateToProps = state=>{
  return {
    isLoading:state.isLoading
  }
}

export default connect(mapStateToProps)(Blog)