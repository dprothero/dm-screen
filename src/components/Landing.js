import React from 'react';
import Navigation from './Navigation';

const LandingPage = ({authUser}) =>
  <div>
    <h1>Welcome to the DM Screen</h1>
    <Navigation authUser={authUser} />
  </div>

export default LandingPage;
