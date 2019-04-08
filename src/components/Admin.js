import copy from 'copy-to-clipboard';
import React, { Component } from 'react';
import { db } from '../firebase';
import './Admin.css';
import HistoryList from './HistoryList';
import Navigation from './Navigation';
import withAuthorization from './withAuthorization';

class AdminPage extends Component {
  constructor(props) {
    super(props);

    const params = new URLSearchParams(props.location.search);
    const searchUrl = params.get('url');
    const searchTitle = params.get('title');

    this.state = {
      url: searchUrl || props.url,
      title: searchTitle || props.title,
      contentType: props.contentType
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.pushItem = this.pushItem.bind(this);
    this.getLink = this.getLink.bind(this);
    this.selectItem = this.selectItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);

    if (searchUrl || searchTitle) {
      this.pushItem();
      props.history.push('/admin');
    }
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
            <input type="text" value={this.state.title || ''} onChange={this.handleTitleChange} />
          </div>
          <div>
            <strong>Url: </strong>
            <input type="text" value={this.state.url || ''} onChange={this.handleUrlChange} />
          </div>
          <div>
            <strong />
            <button type="button" className="btn btn-primary" onClick={this.pushItem}>
              Push
            </button>
            <button type="button" className="btn btn-secondary" onClick={this.getLink}>
              <span role="img" aria-labelledby="btnGetLink">
                🔗
              </span>{' '}
              <span id="btnGetLink">Get Link</span>
            </button>
          </div>
        </form>
        <hr />
        <h2>History</h2>
        <HistoryList urlHistory={this.props.urlHistory} selectItem={this.selectItem} deleteItem={this.deleteItem} />
      </div>
    );
  }

  handleTitleChange(event) {
    this.setState({ title: event.target.value });
  }

  handleUrlChange(event) {
    this.setState({ url: event.target.value });
  }

  pushItem() {
    db.pushItem(this.state);
  }

  getLink() {
    const title = encodeURIComponent(this.state.title);
    const url = encodeURIComponent(this.state.url);
    const search = `?title=${title}&url=${url}`;
    const adminUrl = window.location.origin + window.location.pathname + search;
    copy(adminUrl);
  }

  selectItem(item) {
    this.setState(item, () => {
      this.pushItem();
    });
  }

  deleteItem(item) {
    db.deleteHistoryItem(item);
  }
}

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(AdminPage);
