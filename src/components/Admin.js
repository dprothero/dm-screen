import React, { Component } from 'react';
import Navigation from './Navigation';
import HistoryList from './HistoryList';
import withAuthorization from './withAuthorization';
import { db } from '../firebase';
import './Admin.css';

class AdminPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: props.url,
      title: props.title,
      contentType: props.contentType
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.pushItem = this.pushItem.bind(this);
    this.selectItem = this.selectItem.bind(this);
  }

  render() {
    return (
      <div>
        <h1>DM Screen - Admin</h1>
        <Navigation authUser={this.props.authUser} />
        <hr />
        <form className="AdminForm">
          <div>
            <strong>Title: </strong>
            <input type="text" value={this.state.title || ""} onChange={this.handleTitleChange} />
          </div>
          <div>
            <strong>Url: </strong>
            <input type="text" value={this.state.url || ""} onChange={this.handleUrlChange} />
          </div>
          <div>
            <strong />
            <button type="button" onClick={this.pushItem}>
              Push
            </button>
          </div>
        </form>
        <hr />
        <div>
          <h2>History</h2>
          <HistoryList urlHistory={this.props.urlHistory} selectItem={this.selectItem} />
        </div>
      </div>
    );
  }

  handleTitleChange(event) {
    this.setState({title: event.target.value});
  }

  handleUrlChange(event) {
    this.setState({url: event.target.value});
  }

  pushItem() {
    db.pushItem(this.state, this.props);
  }

  selectItem(item) {
    this.setState(item, () => {
      this.pushItem();
    });
  }
}

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(AdminPage);
