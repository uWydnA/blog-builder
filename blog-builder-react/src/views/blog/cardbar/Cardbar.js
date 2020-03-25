import React, { Component } from 'react'
import img from '../../../img/wd.jpg'
import { Card, Avatar } from 'antd';
// import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import './cardbar.css'
const { Meta } = Card;
export default class Cardbar extends Component {
  render() {
    return (
      <div className='cardbar'>
        <Card
          style={{ width: 'auto', background: '#202124', color: '#fff', border: '0' }}
          cover={
            <div style={{ height: '200px', verticalAlign: 'middle', lineHeight: '200px', textAlign: 'center' }}>
              <img
                alt="example"
                src={img}
                style={{ width: 128, height: 128, borderRadius: '50%' }}
              />
            </div>
          }
          // actions={[
          //   <SettingOutlined key="setting" />,
          //   <EditOutlined key="edit" />,
          //   <EllipsisOutlined key="ellipsis" />,
          // ]}
        >
          <Meta
            title="梁朝伟"
            description={
              <div className='cardDes'>
                <div className='left'>
                  <div className='cardDesnum'>{this.props.data.length}</div>
                  <div className='cardDesArt'>文章</div>
                </div>
                <div className='right'>
                  <div className='cardDesnum'>{this.props.catelist.length?this.props.catelist.map(val=>val.num).reduce((prev,inow)=>prev+inow):null}</div>
                  <div className='cardDesArt'>标签</div>
                </div>
              </div>}
          />
        </Card>
      </div>
    )
  }
}
