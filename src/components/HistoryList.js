import React, { Component } from 'react';

class HistoryList extends Component {
  render() {
    const items = Object.keys(this.props.urlHistory).map(key => {
      const item = this.props.urlHistory[key];
      return (
        <li key={key}>
          <a href="" onClick={this.clickItem.bind(this, item)}>{item.title}</a>
        </li>
      );
    });
    return (
      <ul>{items}</ul>
    );
  }

  clickItem(item, e) {
    e.preventDefault();
    if(typeof this.props.selectItem === 'function') {
      this.props.selectItem(item);
    }
  }
}

export default HistoryList;
