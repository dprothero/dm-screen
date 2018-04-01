import React, { Component } from 'react';

class HistoryList extends Component {
  render() {
    const items = Object.keys(this.props.urlHistory).map(key => {
      const item = this.props.urlHistory[key];
      return (
        <tr key={key}>
          <td>
            <button type="button" onClick={this.deleteItem.bind(this, item)}>X</button>
          </td>
          <td>
            <a href="" onClick={this.clickItem.bind(this, item)}>{item.title}</a>
          </td>
        </tr>
      );
    });
    return (
      <table><tbody>{items}</tbody></table>
    );
  }

  clickItem(item, e) {
    e.preventDefault();
    if(typeof this.props.selectItem === 'function') {
      this.props.selectItem(item);
    }
  }

  deleteItem(item, e) {
    e.preventDefault();
    if(typeof this.props.deleteItem === 'function') {
      this.props.deleteItem(item);
    }
  }
}

export default HistoryList;
