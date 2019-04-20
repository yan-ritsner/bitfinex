import { all, put, select, takeEvery } from "redux-saga/effects";
import * as types from "../actions/actionTypes";
import {
  subscribeTicker,
  subscribeTickerSucceeded,
  unsubscribeTicker,
  unsubscribeTickerSucceeded,
  tickerUpdateReceived
} from "../actions/tickerActions";

function* symbolSelected() {
  const chanId = yield select(state => state.ticker.chanId);
  const symbol = yield select(state => state.symbols.selectedSymbol);
  const socket = yield select(state => state.socket);
  if (chanId && socket.open) {
    yield put(unsubscribeTicker(socket.socket, chanId));
  }
  if (symbol && socket.open) {
    yield put(subscribeTicker(socket.socket, symbol));
  }
}

function* socketOpened() {
  const symbol = yield select(state => state.symbols.selectedSymbol);
  const socket = yield select(state => state.socket);
  if (symbol && socket.open) {
    yield put(subscribeTicker(socket.socket, symbol));
  }
}

function* socketMessageReceived() {
  const chanId = yield select(state => state.ticker.chanId);
  const message = yield select(state => state.socket.message);
  //snapshot or update or hb
  if (Array.isArray(message) && message[0] === chanId) {
    var payload = message[1];
    if (payload) {
      if (payload === "hb") {
      } else if (Array.isArray(payload)) {
        yield put(tickerUpdateReceived(payload));
      }
    }
  }
  //subscribe/unsubscribe response
  else if (message.channel === "ticker") {
    switch (message.event) {
      case "subscribed": {
        yield put(subscribeTickerSucceeded(message.chanId));
        break;
      }
      case "unsubscribed": {
        yield put(unsubscribeTickerSucceeded());
        break;
      }
      default:
    }
  }
}

function sendSubscribe(socket, symbol) {
  socket.send(
    JSON.stringify({
      event: "subscribe",
      channel: "ticker",
      symbol: `${symbol.toUpperCase()}`
    })
  );
}

function sendUnsubscribe(socket, chanId) {
  socket.send(
    JSON.stringify({
      event: "unsubscribe",
      chanId: chanId
    })
  );
}

export default function* tickerSaga() {
  yield all([
    takeEvery(types.SOCKET_OPEN, socketOpened),
    takeEvery(types.SELECT_SYMBOL, symbolSelected),
    takeEvery(types.SOCKET_MESSAGE, socketMessageReceived),
    takeEvery(types.SUBSCRIBE_TICKER_REQUESTED, action =>
      sendSubscribe(action.socket, action.symbol)
    ),
    takeEvery(types.UNSUBSCRIBE_TICKER_REQUESTED, action =>
      sendUnsubscribe(action.socket, action.chanId)
    )
  ]);
}
