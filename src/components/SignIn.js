import React from 'react';

import { auth } from '../firebase';

const SignInButton = () =>
  <button
    type="button"
    className="btn btn-success"
    onClick={auth.doGoogleLogin}
  >
    Sign In
  </button>

export default SignInButton;
