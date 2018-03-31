import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import LandingPage from './Landing';
import AdminPage from './Admin';
import PlayersPage from './Players';

import * as routes from '../constants/routes';
import { firebase, db } from '../firebase';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
      url: null,
      title: null,
      contentType: null
    };
  }
  
  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState(() => ({ authUser }))
        : this.setState(() => ({ authUser: null }));
    });

    db.onCurrentViewChanged(snapshot => {
      this.setState(() => (snapshot.val()));
    });
  }

  render() {
    return (
      <Router>
        <div id="router">
          <Route
            exact path={routes.LANDING}
            component={() => <LandingPage authUser={this.state.authUser} />}
          />
          <Route
            exact path={routes.ADMIN}
            component={() => 
                        <AdminPage
                          url={this.state.url}
                          title={this.state.title}
                          contentType={this.state.contentType}
                          authUser={this.state.authUser}
                        />
                      }
          />
          <Route
            exact path={routes.PLAYERS}
            component={() => 
                        <PlayersPage
                          url={this.state.url}
                          title={this.state.title}
                          contentType={this.state.contentType}
                          authUser={this.state.authUser}
                        />
                      }
          />
        </div>
      </Router>
    );
  }
}

export default App;
