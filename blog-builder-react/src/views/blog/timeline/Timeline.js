import React, { Component } from 'react'
import { withRouter } from 'react-router'
import ToTOP from '../totop/toTOP'
import { Timeline } from 'antd'
import { connect } from 'react-redux'
import './timeline.css'
class TimeLine extends Component {
  componentDidMount() {
    React.$axios.get("http://localhost:12138/articles").then(res => {
      var arr = []
      res.data.map(item => {
        arr.push(item.time.split("-")[0])
      })
      var newarr = []
      newarr = [...new Set(arr)]
      this.setState({
        year: newarr.sort((a, b) => {
          return b - a
        })
      })

      var list = []
      for (var i in this.state.year) {
        list.push({
          inDex: this.state.year[i],
          list: res.data.filter(item => item.time.split("-")[0] === this.state.year[i]).sort(function (a, b) {
            return Date.parse(b.time) - Date.parse(a.time);//时间正序
          })
        })
      }
      this.setState({
        datalist: list
      }, () => {
        this.props.actionCreator(false)
      })
    })
  }

  componentWillUnmount() {
    this.props.actionCreator(true)

  }

  // handletiao = (data) => {
  //   // console.log(data);
  //   this.props.history.push(`/detail/${data.category}/${data.title}`)
  // }



  state = {
    datalist: [],
    year: []
  }

  render() {
    return (
      <div className="box">
        <Timeline>
          <Timeline.Item color="black" className="head">
            Yesterday Once More!
          </Timeline.Item>
          {
            this.state.datalist.map(item =>
              <div key={item.inDex}>
                <Timeline.Item color="black" key={item.inDex} style={{ paddingTop: "5px", paddingBottom: "40px" }} >
                  <a className="te" style={{ paddingLeft: "10px" }}>{item.inDex}</a>
                </Timeline.Item>
                {
                  item.list.map(data =>
                    <Timeline.Item color="red" className="word" key={data.id} onMouseOver={this.onmouseover}>
                      <a className="putong" style={{ padding: "10px" }}
                        onClick={() => {
                          this.props.history.push(`/detail/${data.category}/${data.title}`)
                        }}
                      >
                        <span style={{ paddingRight: "15px", fontSize: "12px" }}>{data.time.substring(5)}</span>
                        <span>{data.title}</span>
                      </a>
                    </Timeline.Item>
                  )
                }
              </div>
            )
          }
        </Timeline>
        <ToTOP></ToTOP>
      </div >
    )
  }
}


const mapStateToProps = state => {
  return {
    isLoading: state.isLoading
  }
}

const mapDispatchToProps = {
  actionCreator: (data) => {
    return {
      type: 'loading',
      payload: data
    }
  }
}

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TimeLine));
export default connect(mapStateToProps, mapDispatchToProps)(TimeLine)

