import { auth, provider } from './firebase';

export const doGoogleLogin = () => auth.signInWithPopup(provider);

export const doSignOut = () => auth.signOut();
