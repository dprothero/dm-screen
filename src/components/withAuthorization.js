import React from 'react';
import { withRouter } from 'react-router-dom';
import * as routes from '../constants/routes';
import { firebase } from '../firebase';

const withAuthorization = authCondition => Component => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      firebase.auth.onAuthStateChanged(authUser => {
        if (!authCondition(authUser)) {
          this.props.history.push(routes.LANDING);
        }
      });
    }

    render() {
      return this.props.authUser ? <Component {...this.props} /> : null;
    }
  }

  return withRouter(WithAuthorization);
};

export default withAuthorization;
