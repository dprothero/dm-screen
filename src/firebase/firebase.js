import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import config from './config';

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const database = firebase.database();

export { auth, database, provider };
