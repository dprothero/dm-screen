import * as functions from 'firebase-functions';
import axios from 'axios';

async function handleUpdateCurrentView(event) {
  // Grab the current value of what was written to the Realtime Database.
  const data = event.data.val();

  console.log('Version 9');

  if(!data.url || data.contentType) {
    // URL not ready or contentType already set, avoid recursion
    return;
  }

  console.log(`Got url: ${data.url}`);

  // Check if this URL already exists in history
  const ref = event.data.ref.parent.child("history").orderByChild('url').equalTo(data.url);
  const historyItems = (await ref.once("value")).val();
  let historyItem = null, historyItemKey = null;
  if(historyItems) {
    historyItemKey = Object.keys(historyItems)[0];
    historyItem = historyItems[historyItemKey];
  }

  let response, contentType = 'unknown';
  if(historyItem) {
    console.log('Found in cache!');
    contentType = historyItem.contentType;
    // Remove old item from history
    await event.data.ref.parent.child('history').child(historyItemKey).remove();
  } else {
    try {
      // HEAD request to get content-type of url
      response = await axios.head(data.url);      
      contentType = response.headers['content-type'];
    } catch (error) {
      console.log(error);
    }
  }

  // Update the contentType on the object
  data.contentType = contentType;
  await event.data.ref.set(data);

  // Log the object to history
  await event.data.ref.parent.child('history').push(data);

  return;
}

export const updateCurrentView = functions.database.ref('/currentView').onWrite(handleUpdateCurrentView);
