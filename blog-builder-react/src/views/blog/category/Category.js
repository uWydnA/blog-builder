import React, { Component } from 'react'

export default class Category extends Component {
  render() {
    return (
      <div>
        category -- {this.props.match.params.id}
      </div>
    )
  }
}
