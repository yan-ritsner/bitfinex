import * as types from "./actionTypes";

export function subscribeTicker(socket, symbol) {
  return {
    type: types.SUBSCRIBE_TICKER_REQUESTED,
    socket: socket,
    symbol: symbol
  };
}

export function subscribeTickerSucceeded(chanId) {
  return {
    type: types.SUBSCRIBE_TICKER_SUCCEEDED,
    chanId: chanId
  };
}

export function subscribeTickerFailed(error) {
  return { type: types.SUBSCRIBE_TICKER_FAILED, error: error };
}

export function unsubscribeTicker(socket, chanId) {
  return {
    type: types.UNSUBSCRIBE_TICKER_REQUESTED,
    socket: socket,
    chanId: chanId
  };
}

export function unsubscribeTickerSucceeded() {
  return { type: types.UNSUBSCRIBE_TICKER_SUCCEEDED };
}

export function unsubscribeTickerFailed(error) {
  return { type: types.UNSUBSCRIBE_TICKER_FAILED, error: error };
}

export function tickerUpdateReceived(update) {
  return { type: types.TICKER_UPDATE_RECEIVED, update: update };
}
