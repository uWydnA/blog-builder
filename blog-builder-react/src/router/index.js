import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import {connect} from 'react-redux'
import Blog from "../views/blog/Blog"
import Cma from '../views/cma/Cma'
import Login from '../views/login/Login'
import Category from '../views/blog/category/Category'
import Home from '../views/blog/home/Home'
import Detail from '../views/blog/detail/Detail'
import Tag from '../views/blog/tag/Tag'
import Timeline from '../views/blog/timeline/Timeline'
class BlogRouter extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/login' component={Login}></Route>
          <Route path='/cma' render={() => {
            return (
              localStorage.getItem('token') ?
                <Cma></Cma>
                : <Redirect to='/login'></Redirect>
            )
          }}></Route>
          <Route path='/' render={(props)=>(
            <Blog>
              <Switch>
                <Route path='/category/:id' component={Category}></Route>
                <Route path='/home' component={Home}></Route>
                <Route path='/detail/:category/:id' component={Detail}></Route>
                <Route path='/tag' component={Tag}></Route>
                <Route path='/timeline' component={Timeline}></Route>
                <Redirect to='/home'></Redirect>
              </Switch>
            </Blog>
          )}></Route>
        </Switch>
      </Router>
    )
  }
}
const mapStateToProps = state=>{
  return {
    isLoading:state.isLoading
  }
}

const mapDispatchToProps = {
  actionCreator : ()=>{
    return {
      type:'loading',
      payload:false
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(BlogRouter);