import React from 'react';
import './Players.css';

const PlayersPage = ({url, title}) =>
  <iframe src={url} title={title} />

export default PlayersPage;
