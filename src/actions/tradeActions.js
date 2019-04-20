import * as types from "./actionTypes";

/**
 * Subscribes to the trades on specific symbol
 * @param {Socket} socket instance
 * @param {string} symbol symbol name
 */
export function subscribeTrades(socket, symbol) {
  return {
    type: types.SUBSCRIBE_TRADES_REQUESTED,
    socket: socket,
    symbol: symbol
  };
}

/**
 * Subscribe trades succeeded
 * @param {number} chanId  - channel id
 */
export function subscribeTradesSucceeded(chanId) {
  return {
    type: types.SUBSCRIBE_TRADES_SUCCEEDED,
    chanId: chanId
  };
}

/**
 * Subscribe trades failed
 * @param {string} error - error message
 */
export function subscribeTradesFailed(error) {
  return { type: types.SUBSCRIBE_TRADES_FAILED, error: error };
}

/**
 * Unsubscribes from the trades on specific channel
 * @param {number} chanId  -channel id
 */
export function unsubscribeTrades(socket, chanId) {
  return {
    type: types.UNSUBSCRIBE_TRADES_REQUESTED,
    socket: socket,
    chanId: chanId
  };
}

/**
 * Unsubscribe trades succeeded
 * @param {number} chanId  - channel id
 */
export function unsubscribeTradesSucceeded() {
  return { type: types.UNSUBSCRIBE_TRADES_SUCCEEDED };
}

/**
 * Unsubscribe trades failed
 * @param {string} error - error message
 */
export function unsubscribeTradesFailed(error) {
  return { type: types.UNSUBSCRIBE_TRADES_FAILED, error: error };
}

/**
 * Trades subscription snapshot received
 * @param {array} snapshot - snapshot data
 */
export function tradeSnapshotReceived(snapshot) {
  return { type: types.TRADES_SNAPSHOT_RECEIVED, snapshot: snapshot };
}

/**
 * Trade subscription update received
 * @param {array} update - update data
 */
export function tradeUpdateReceived(updateType, update) {
  return {
    type: types.TRADES_UPDATE_RECEIVED,
    updateType: updateType,
    update: update
  };
}
