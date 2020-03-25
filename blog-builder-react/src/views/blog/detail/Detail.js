import React, { Component } from 'react'
import './detail.css'
import { TagOutlined, ClockCircleOutlined, UserOutlined} from '@ant-design/icons';
export default class Detail extends Component {
  state = {
    datalist:[]
  }
  componentDidMount() {
    React.$axios.get(`http://localhost:12138/articles?title=${this.props.match.params.id}`).then(res=>{
      this.setState({
        datalist:res.data[0]
      })
    })
  }
  
  render() {
    return (
      <div style={{width:"100%",height:'100%',background:' #202124',color:"#FFF"}}>
        {/* detail -- {this.props.match.params.id}--{this.props.match.params.category} */}
        <div className="wrapper">
            <div className="title">
              <h1>{this.props.match.params.id}</h1>
            </div>
            <div className="details">
                <span>
                  <UserOutlined />
                  {this.state.datalist.author}
                </span>
                <span>
                  <ClockCircleOutlined />
                  {this.state.datalist.time}
                </span>
                <span>
                  <TagOutlined />
                  {this.state.datalist.category}
                </span>
            </div>
            <div className="content" dangerouslySetInnerHTML={{
                     __html:this.state.datalist.content
                 }}>
            </div>  
        </div>
      </div>
    )
  }
}
