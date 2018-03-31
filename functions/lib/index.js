"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const axios_1 = require("axios");
function handleUpdateCurrentView(event) {
    return __awaiter(this, void 0, void 0, function* () {
        // Grab the current value of what was written to the Realtime Database.
        const data = event.data.val();
        console.log('Version 9');
        if (!data.url || data.contentType) {
            // URL not ready or contentType already set, avoid recursion
            return;
        }
        console.log(`Got url: ${data.url}`);
        // Check if this URL already exists in history
        const ref = event.data.ref.parent.child("history").orderByChild('url').equalTo(data.url);
        const historyItems = (yield ref.once("value")).val();
        let historyItem = null, historyItemKey = null;
        if (historyItems) {
            historyItemKey = Object.keys(historyItems)[0];
            historyItem = historyItems[historyItemKey];
        }
        let response, contentType = 'unknown';
        if (historyItem) {
            console.log('Found in cache!');
            contentType = historyItem.contentType;
            // Remove old item from history
            yield event.data.ref.parent.child('history').child(historyItemKey).remove();
        }
        else {
            try {
                // HEAD request to get content-type of url
                response = yield axios_1.default.head(data.url);
                contentType = response.headers['content-type'];
            }
            catch (error) {
                console.log(error);
            }
        }
        // Update the contentType on the object
        data.contentType = contentType;
        yield event.data.ref.set(data);
        // Log the object to history
        yield event.data.ref.parent.child('history').push(data);
        return;
    });
}
exports.updateCurrentView = functions.database.ref('/currentView').onWrite(handleUpdateCurrentView);
//# sourceMappingURL=index.js.map