import React, { Component } from 'react'
import './banner.css'
import bannerimg from '../../../img/mty.jpg'
export default class Banner extends Component {
  render() {
    return (
      <div className='banner'>
        <div className='mask' style={{background:`url(${bannerimg}) center/cover no-repeat`}}></div>
      </div>
    )
  }
}
