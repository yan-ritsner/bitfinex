import * as types from "./actionTypes";

/**
 * Subscribes to the ticker on specific symbol
 * @param {Socket} socket instance
 * @param {string} symbol symbol name
 */
export function subscribeTicker(socket, symbol) {
  return {
    type: types.SUBSCRIBE_TICKER_REQUESTED,
    socket: socket,
    symbol: symbol
  };
}

/**
 * Subscribe ticker succeeded
 * @param {number} chanId  - channel id
 */
export function subscribeTickerSucceeded(chanId) {
  return {
    type: types.SUBSCRIBE_TICKER_SUCCEEDED,
    chanId: chanId
  };
}

/**
 * Subscribe ticker failed
 * @param {string} error - error message
 */
export function subscribeTickerFailed(error) {
  return { type: types.SUBSCRIBE_TICKER_FAILED, error: error };
}

/**
 * Unsubscribes from the ticker on specific channel
 * @param {number} chanId  - channel id
 */
export function unsubscribeTicker(socket, chanId) {
  return {
    type: types.UNSUBSCRIBE_TICKER_REQUESTED,
    socket: socket,
    chanId: chanId
  };
}

/**
 * Unsubscribe ticker succeeded
 * @param {number} chanId  - channel id
 */
export function unsubscribeTickerSucceeded() {
  return { type: types.UNSUBSCRIBE_TICKER_SUCCEEDED };
}

/**
 * Unsubscribe ticker failed
 * @param {string} error - error message
 */
export function unsubscribeTickerFailed(error) {
  return { type: types.UNSUBSCRIBE_TICKER_FAILED, error: error };
}

/**
 * Ticker subscription update received
 * @param {array} update - update data
 */
export function tickerUpdateReceived(update) {
  return { type: types.TICKER_UPDATE_RECEIVED, update: update };
}
