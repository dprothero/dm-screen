import React, { Component } from 'react';
import './Players.css';

class PlayersPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: props.url,
      title: props.title,
      contentType: props.contentType
    };
  }

  render() {
    if(this.state.url) {

      if(this.state.contentType && this.state.contentType.startsWith('image')) {
        return (
          <img src={this.state.url} title={this.state.title} alt={this.state.title} />
        );
      }

      return (
        <iframe src={this.state.url} title={this.state.title} />
      );
    }

    return (
      <h1>Waiting for the DM... { this.state.contentType }</h1>
    );
  }
}

export default PlayersPage;
