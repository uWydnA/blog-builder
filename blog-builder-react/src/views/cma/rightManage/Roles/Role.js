import React, { Component } from 'react'
import { Table, Button, Tag } from 'antd';
import './role.css';
import { SearchOutlined } from '@ant-design/icons';
import store from '../../../../redux/store'
export default class Role extends Component {
    state = {
        columns: [
            { title: '角色名称', dataIndex: 'roleName', key: 'roleName' },
            {
                title: '操作',
                dataIndex: '',
                key: 'x',
                render: () => <div>
                    <Button type="primary" shape="circle" icon={<SearchOutlined />} disabled={true} />
                </div>,
            }
        ],
        datalist: []

    }
    actionCreate = () => {
        return (dispatch) => {
            React.$axios.get("http://localhost:12138/roles").then(res => {
                dispatch({
                    type: 'role',
                    payload: res.data
                })
            })
        }
    }
    componentDidMount() {
        if (store.getState().roleList.length === 0) {
            store.dispatch(this.actionCreate())
        } else {
            this.setState({
                datalist: store.getState().roleList
            })
        }
        this.unscribe = store.subscribe(() => {
            this.setState({
                datalist: store.getState().roleList
            })
        })
    }
    componentWillUnmount() {
        this.unscribe();
    }

    render() {
        return (
            <Table
                columns={this.state.columns}
                dataSource={this.state.datalist}
                rowKey={item => {
                    return item.id
                }}
                expandable={{
                    expandedRowRender: record => {
                        return <div style={{ margin: 0 }}>
                            {
                                record.roleRight.map(item =>
                                    <div key={item.category}>
                                        {
                                            item.list.map(data =>
                                                <Tag color={"green"} key={data}>{data}</Tag>
                                            )
                                        }
                                    </div>
                                )
                            }
                        </div>
                    },
                }}
            />
        )
    }
}
