import React from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';
import './Navigation.css';
import SignInButton from './SignIn';
import SignOutButton from './SignOut';

const Navigation = ({ authUser }) => (
  <div className="Navigation">{authUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>
);

const NavigationAuth = () => (
  <ul>
    <li>
      <Link to={routes.ADMIN}>Admin</Link>
    </li>
    <li>
      <Link to={routes.PLAYERS}>Players&#39; View</Link>
    </li>
    <li>
      <SignOutButton />
    </li>
  </ul>
);

const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link to={routes.PLAYERS}>Players&#39; View</Link>
    </li>
    <li>
      <SignInButton />
    </li>
  </ul>
);

export default Navigation;
