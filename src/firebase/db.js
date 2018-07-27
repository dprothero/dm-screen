import { database } from './firebase';

export const onCurrentViewChanged = fn => {
  const ref = database.ref('/currentView');
  ref.on('value', fn);
};

export const onHistoryChanged = fn => {
  const ref = database.ref('/history');
  ref.on('value', fn);
};

export const pushItem = newItem => {
  const currentViewRef = database.ref('/currentView');
  currentViewRef.set({
    title: newItem.title,
    url: newItem.url
  });
};

export const deleteHistoryItem = item => {
  const ref = database
    .ref('/history')
    .orderByChild('url')
    .equalTo(item.url);
  ref.once('value', data => {
    const records = data.val();
    if (records) {
      const key = Object.keys(records)[0];
      database.ref(`/history/${key}`).remove();
    }
  });
};
