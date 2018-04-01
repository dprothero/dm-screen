import { database } from './firebase';

export const onCurrentViewChanged = (fn) => {
  const ref = database.ref("/currentView");
  ref.on("value", fn);
};

export const onHistoryChanged = (fn) => {
  const ref = database.ref("/history");
  ref.on("value", fn);
};

export const pushItem = (newItem, oldItem) => {
  const currentViewRef = database.ref("/currentView");
  currentViewRef.set({
    title: newItem.title,
    url: newItem.url
  });
};
