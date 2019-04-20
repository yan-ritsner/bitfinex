import * as types from "./actionTypes";

export function subscribeTrades(socket, symbol) {
  return {
    type: types.SUBSCRIBE_TRADES_REQUESTED,
    socket: socket,
    symbol: symbol
  };
}

export function subscribeTradesSucceeded(chanId) {
  return {
    type: types.SUBSCRIBE_TRADES_SUCCEEDED,
    chanId: chanId
  };
}

export function subscribeTradesFailed(error) {
  return { type: types.SUBSCRIBE_TRADES_FAILED, error: error };
}

export function unsubscribeTrades(socket, chanId) {
  return {
    type: types.UNSUBSCRIBE_TRADES_REQUESTED,
    socket: socket,
    chanId: chanId
  };
}

export function unsubscribeTradesSucceeded() {
  return { type: types.UNSUBSCRIBE_TRADES_SUCCEEDED };
}

export function unsubscribeTradesFailed(error) {
  return { type: types.UNSUBSCRIBE_TRADES_FAILED, error: error };
}

export function tradeSnapshotReceived(snapshot) {
  return { type: types.TRADES_SNAPSHOT_RECEIVED, snapshot: snapshot };
}

export function tradeUpdateReceived(update) {
  return { type: types.TRADES_UPDATE_RECEIVED, update: update };
}
