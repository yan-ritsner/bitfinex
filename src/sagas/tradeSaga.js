import { all, put, select, takeEvery } from "redux-saga/effects";
import * as types from "../actions/actionTypes";
import {
  subscribeTrades,
  subscribeTradesSucceeded,
  unsubscribeTrades,
  unsubscribeTradesSucceeded,
  tradeSnapshotReceived,
  tradeUpdateReceived
} from "../actions/tradeActions";

function* symbolSelected() {
  const chanId = yield select(state => state.trades.chanId);
  const symbol = yield select(state => state.symbols.selectedSymbol);
  const socket = yield select(state => state.socket);
  if (chanId && socket.open) {
    yield put(unsubscribeTrades(socket.socket, chanId));
  }
  if (symbol && socket.open) {
    yield put(subscribeTrades(socket.socket, symbol));
  }
}

function* socketOpened() {
  const symbol = yield select(state => state.symbols.selectedSymbol);
  const socket = yield select(state => state.socket);
  if (symbol && socket.open) {
    yield put(subscribeTrades(socket.socket, symbol));
  }
}

function* socketMessageReceived() {
  const chanId = yield select(state => state.trades.chanId);
  const message = yield select(state => state.socket.message);
  //snapshot or update or hb
  if (Array.isArray(message) && message[0] === chanId) {
    var payload = message[1];
    if (payload) {
      if (payload[0] === "hb") {
      } else if (Array.isArray(payload[0])) {
        yield put(tradeSnapshotReceived(payload));
      } else {
        yield put(tradeUpdateReceived(payload));
      }
    }
  }
  //subscribe/unsubscribe response
  else if (message.channel === "trade") {
    switch (message.event) {
      case "subscribed": {
        yield put(subscribeTradesSucceeded(message.chanId));
        break;
      }
      case "unsubscribed": {
        yield put(unsubscribeTradesSucceeded());
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
      channel: "trades",
      symbol: `t${symbol.toUpperCase()}`,
      pair: symbol.toUpperCase()
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

export default function* tradesSaga() {
  yield all([
    takeEvery(types.SOCKET_OPEN, socketOpened),
    takeEvery(types.SELECT_SYMBOL, symbolSelected),
    takeEvery(types.SOCKET_MESSAGE, socketMessageReceived),
    takeEvery(types.SUBSCRIBE_TRADES_REQUESTED, action =>
      sendSubscribe(action.socket, action.symbol)
    ),
    takeEvery(types.UNSUBSCRIBE_TRADES_REQUESTED, action =>
      sendUnsubscribe(action.socket, action.chanId)
    )
  ]);
}
