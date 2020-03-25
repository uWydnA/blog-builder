import React,{Component} from 'react';
import BlogRouter from './router/index'
import {connect} from 'react-redux'
import Loading from './views/loading/Loading'
import './App.css';
class App extends Component {
  render() {
    return (
      <div className="App" style={{ height: '100%' }}>
        {
          this.props.isLoading ?
            <div style={{position:'absolute',zIndex:'1111',width:'100%',height:'100%',background:'#202124'}}>
              <Loading />
            </div>
            :
            null
        }
        <BlogRouter></BlogRouter>
      </div>
    );
  }

}
const mapStateToProps = state=>{
  return {
    isLoading:state.isLoading
  }
}

export default connect(mapStateToProps)(App);
