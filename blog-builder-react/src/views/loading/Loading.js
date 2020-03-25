import React, { Component } from 'react'
import './Loading.css'
export default class Loading extends Component {
    render() {
        return (
            <div className="loader" style={{ color: '#3eaf7c' }}>
                {/* <div className="text">Loading...</div> */}
                <div className="horizontal">
                    <div className="circlesup">
                        <div className="circle"></div>
                        <div className="circle"></div>
                        <div className="circle"></div>
                        <div className="circle"></div>
                        <div className="circle"></div>
                    </div>
                    <div className="circlesdwn">
                        <div className="circle"></div>
                        <div className="circle"></div>
                        <div className="circle"></div>
                        <div className="circle"></div>
                        <div className="circle"></div>
                    </div>
                </div>
                <div className="vertical">
                    <div className="circlesup">
                        <div className="circle"></div>
                        <div className="circle"></div>
                        <div className="circle"></div>
                        <div className="circle"></div>
                        <div className="circle"></div>
                    </div>
                    <div className="circlesdwn">
                        <div className="circle"></div>
                        <div className="circle"></div>
                        <div className="circle"></div>
                        <div className="circle"></div>
                        <div className="circle"></div>
                    </div>
                </div>
            </div>
        )
    }
}
