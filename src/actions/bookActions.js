import * as types from "./actionTypes";

/**
 * Subscribes to the books on specific symbol and precision
 * @param {Socket} socket instance
 * @param {string} symbol symbol name
 * @param {number} precision - price precision
 */
export function subscribeBooks(socket, symbol, precision) {
  return {
    type: types.SUBSCRIBE_BOOKS_REQUESTED,
    socket: socket,
    symbol: symbol,
    precision: precision
  };
}

/**
 * Subscribe book succeeded
 * @param {number} chanId  - channel id
 */
export function subscribeBooksSucceeded(chanId) {
  return {
    type: types.SUBSCRIBE_BOOKS_SUCCEEDED,
    chanId: chanId
  };
}

/**
 * Subscribe book failed
 * @param {string} error - error message
 */
export function subscribeBooksFailed(error) {
  return { type: types.SUBSCRIBE_BOOKS_FAILED, error: error };
}

/**
 * Unsubscribes from the books on specific channel
 * @param {number} chanId  -channel id
 */
export function unsubscribeBooks(socket, chanId) {
  return {
    type: types.UNSUBSCRIBE_BOOKS_REQUESTED,
    socket: socket,
    chanId: chanId
  };
}

/**
 * Unsubscribe book succeeded
 * @param {number} chanId  - channel id
 */
export function unsubscribeBooksSucceeded() {
  return { type: types.UNSUBSCRIBE_BOOKS_SUCCEEDED };
}

/**
 * Unsubscribe book failed
 * @param {string} error - error message
 */
export function unsubscribeBooksFailed(error) {
  return { type: types.UNSUBSCRIBE_BOOKS_FAILED, error: error };
}

/**
 * Book subscription snapshot received
 * @param {array} snapshot - snapshot data
 */
export function bookSnapshotReceived(snapshot) {
  return { type: types.BOOKS_SNAPSHOT_RECEIVED, snapshot: snapshot };
}

/**
 * Book subscription update received
 * @param {array} update - update data
 */
export function bookUpdateReceived(update) {
  return { type: types.BOOKS_UPDATE_RECEIVED, update: update };
}

/**
 * Update zoom in book depth visualization
 * @param {number} zoom level 1-5
 */
export function bookZoom(zoom) {
  return { type: types.BOOKS_ZOOM, zoom: zoom };
}

/**
 * Update price precision
 * @param {number} precision level 0-4
 */
export function bookPrecision(precision) {
  return { type: types.BOOKS_PRECISION, precision: precision };
}
