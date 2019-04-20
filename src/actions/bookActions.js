import * as types from "./actionTypes";

export function subscribeBooks(socket, symbol) {
  return {
    type: types.SUBSCRIBE_BOOKS_REQUESTED,
    socket: socket,
    symbol: symbol
  };
}

export function subscribeBooksSucceeded(chanId) {
  return {
    type: types.SUBSCRIBE_BOOKS_SUCCEEDED,
    chanId: chanId
  };
}

export function subscribeBooksFailed(error) {
  return { type: types.SUBSCRIBE_BOOKS_FAILED, error: error };
}

export function unsubscribeBooks(socket, chanId) {
  return {
    type: types.UNSUBSCRIBE_BOOKS_REQUESTED,
    socket: socket,
    chanId: chanId
  };
}

export function unsubscribeBooksSucceeded() {
  return { type: types.UNSUBSCRIBE_BOOKS_SUCCEEDED };
}

export function unsubscribeBooksFailed(error) {
  return { type: types.UNSUBSCRIBE_BOOKS_FAILED, error: error };
}

export function bookSnapshotReceived(snapshot) {
  return { type: types.BOOKS_SNAPSHOT_RECEIVED, snapshot: snapshot };
}

export function bookUpdateReceived(update) {
  return { type: types.BOOKS_UPDATE_RECEIVED, update: update };
}
