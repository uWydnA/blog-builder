import React, { Component } from 'react'
import { PageHeader } from 'antd'
import axios from 'axios'
export default class Preview extends Component {
  UNSAFE_componentWillMount() {
    axios.get(`http://api.yolandy.com/api/articles?_id=${this.props.match.params.id}`).then(res => {
      let { title, category, content,time } = res.data
      this.setState({
        title,
        category,
        time,
        content: content
      })
    })
  }
  state = {
    title: '',
    time:'',
    category: [],
    content: ''
  }
  render() {
    return (
      <div>
        <PageHeader
          className="site-page-header"
          onBack={() => {
            this.props.history.goBack()
          }}
          title={this.state.title}
          subTitle={(()=>{
            return (
              `${this.state.category}       ${this.state.time}`
            )
          })()} //分类
        />
        <div dangerouslySetInnerHTML={{
          __html: this.state.content
        }}></div>
      </div>

    )
  }
}
