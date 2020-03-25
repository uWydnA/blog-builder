import React, { Component } from 'react'
import './toTop.css'
import { BackTop } from 'antd'
import { RocketFilled } from '@ant-design/icons';

export default class ToTOP extends Component {
    render() {
        return (
            <div>
                <BackTop visibilityHeight={200}>
                    <div className="ant-back-top-inner">
                        <RocketFilled style={{ color: "#3eaf7c" }} />
                    </div>
                </BackTop>
            </div>
        )
    }
}
