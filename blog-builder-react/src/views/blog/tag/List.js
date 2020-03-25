import React, { Component } from 'react'
import './List.css'
import {
    UserOutlined,
    TagOutlined,
    ClockCircleOutlined
} from '@ant-design/icons'
import { Pagination } from 'antd'
import { List } from 'antd'

export default class TagList extends Component {
    state = {
        dataList: [],
        currentData: [],
        num: 6,
        currentPage: 1
    }

    componentDidMount () {
        if (this.props.articalList) {
            this.setState({ 
                dataList: this.props.articalList
            }, () => {
                this.onChange()
            })
        } 
    }

    UNSAFE_componentWillReceiveProps (nextProps) {
        if (nextProps.articalList) {
            this.setState({
                dataList: nextProps.articalList
            }, () => {
                this.onChange()
            })
        }
    }

    render() {
        const IconText = ({ icon, text }) => (
            <span>
              {React.createElement(icon, { style: { marginRight: 8 } })}
              {text}
            </span>
        )
        return (
            <div id='blogListBox'>
                <List
                itemLayout="vertical"
                size="large"
                dataSource={this.state.currentData}
                renderItem={item => (
                    <List.Item
                    key={item.title}
                    actions={[
                        <IconText icon={UserOutlined} text={item.author} key="list-vertical-star-o" />,
                        <IconText icon={ClockCircleOutlined} text={item.time} key="list-vertical-like-o" />,
                        <div className='goTag'>
                        <TagOutlined/>
                        &nbsp;  
                        <span>{item.tag}</span>
                        </div>
                    ]}
                    >
                    <List.Item.Meta
                    onClick={()=>{
                        this.props.history.push(`/detail/${item.category}/${item.title}`)
                    }}
                        title={<a href={item.href}>{item.title}</a>}
                    />
                    </List.Item>
                )}                
                />
                <Pagination showQuickJumper hideOnSinglePage defaultCurrent={this.state.currentPage} 
                total={this.state.dataList.length/this.state.num*10} onChange={this.onChange}/>
            </div>
        )
    }
    onChange = (pageNumber) => {
        pageNumber || (pageNumber = this.state.currentPage)
        let item = this.state.dataList.filter((val,index) => {
            if ((pageNumber-1)*this.state.num<=index && index<pageNumber*this.state.num) {
                return val
            } else {
                return null
            }
        })      
        this.setState({
            currentData:  item
        })
    }
}
