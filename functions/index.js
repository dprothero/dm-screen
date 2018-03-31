const functions = require('firebase-functions');
const axios = require('axios');

exports.fetchContentType = functions.database.ref('/currentView/url').onWrite((event) => {
  // Grab the current value of what was written to the Realtime Database.
  const url = event.data.val();

  if(url) {
    console.log('Got url: ' + url);
    return axios.head(url).then(response => {
      return event.data.ref.parent.child('contentType').set(response.headers['content-type']);
    }).catch(err => {
      console.log(err);
      return event.data.ref.parent.child('contentType').set('unknown');
    });
  }

  return null;
});
