import { database } from './firebase';

export const onCurrentViewChanged = (fn) => {
  const ref = database.ref("currentView");
  ref.on("value", fn);
};

export const pushItem = (newItem, oldItem) => {
  const currentViewRef = database.ref("currentView");
  currentViewRef.set({
    title: newItem.title,
    url: newItem.url
  });

  const historyRef = database.ref("history");
  historyRef.push({
    title: oldItem.title,
    url: oldItem.url,
    contentType: oldItem.contentType
  });
};
