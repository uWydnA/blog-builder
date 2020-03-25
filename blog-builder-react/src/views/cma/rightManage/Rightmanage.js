import React, { Component } from 'react'
import { Tabs } from 'antd';
import './Rightmanage.css'
const { TabPane } = Tabs;

export default class Manage extends Component {
    callback = (data)=>{
      this.props.history.push(data)
    }
    render() {
        return (
            <div>
               <Tabs activeKey={this.props.location.pathname} onChange={this.callback}>
                    <TabPane tab="角色列表" key="/cma/right-manage/roles">
                    </TabPane>
                    <TabPane tab="权限列表" key="/cma/right-manage/right">
                    </TabPane>
                </Tabs>
                {this.props.children}
            </div>
        )
    }
}