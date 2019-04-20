import { all, put, select, takeEvery } from "redux-saga/effects";
import * as types from "../actions/actionTypes";
import {
  subscribeBooks,
  subscribeBooksSucceeded,
  unsubscribeBooks,
  unsubscribeBooksSucceeded,
  bookSnapshotReceived,
  bookUpdateReceived
} from "../actions/bookActions";

function* symbolSelected() {
  const chanId = yield select(state => state.books.chanId);
  const symbol = yield select(state => state.symbols.selectedSymbol);
  const socket = yield select(state => state.socket);
  if (chanId && socket.open) {
    yield put(unsubscribeBooks(socket.socket, chanId));
  }
  if (symbol && socket.open) {
    yield put(subscribeBooks(socket.socket, symbol));
  }
}

function* socketOpened() {
  const symbol = yield select(state => state.symbols.selectedSymbol);
  const socket = yield select(state => state.socket);
  if (symbol && socket.open) {
    yield put(subscribeBooks(socket.socket, symbol));
  }
}

function* socketMessageReceived() {
  const chanId = yield select(state => state.books.chanId);
  const message = yield select(state => state.socket.message);
  //snapshot or update or hb
  if (Array.isArray(message) && message[0] === chanId) {
    var payload = message[1];
    if (payload) {
      if (payload[0] === "hb") {
      } else if (Array.isArray(payload[0])) {
        yield put(bookSnapshotReceived(payload));
      } else {
        yield put(bookUpdateReceived(payload));
      }
    }
  }
  //subscribe/unsubscribe response
  else if (message.channel === "book") {
    switch (message.event) {
      case "subscribed": {
        yield put(subscribeBooksSucceeded(message.chanId));
        break;
      }
      case "unsubscribed": {
        yield put(unsubscribeBooksSucceeded());
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
      channel: "book",
      symbol: `t${symbol.toUpperCase()}`,
      prec: "P0",
      freq: "F1",
      len: 25
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

export default function* booksSaga() {
  yield all([
    takeEvery(types.SOCKET_OPEN, socketOpened),
    takeEvery(types.SELECT_SYMBOL, symbolSelected),
    takeEvery(types.SOCKET_MESSAGE, socketMessageReceived),
    takeEvery(types.SUBSCRIBE_BOOKS_REQUESTED, action =>
      sendSubscribe(action.socket, action.symbol)
    ),
    takeEvery(types.UNSUBSCRIBE_BOOKS_REQUESTED, action =>
      sendUnsubscribe(action.socket, action.chanId)
    )
  ]);
}
