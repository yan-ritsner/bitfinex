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

/**
 * On Symbol selected subscribes (unsubscribe from previous if needed) to books
 */
function* symbolSelected() {
  const chanId = yield select(state => state.books.chanId);
  const precision = yield select(state => state.books.precision);
  const symbol = yield select(state => state.symbols.selectedSymbol);
  const socket = yield select(state => state.socket);

  if (chanId && socket.open) {
    yield put(unsubscribeBooks(socket.socket, chanId));
  }
  if (symbol && socket.open) {
    yield put(subscribeBooks(socket.socket, symbol, precision));
  }
}

/**
 * On Socket open subscribes to books
 */
function* socketOpened() {
  const precision = yield select(state => state.books.precision);
  const symbol = yield select(state => state.symbols.selectedSymbol);
  const socket = yield select(state => state.socket);
  if (symbol && socket.open) {
    yield put(subscribeBooks(socket.socket, symbol, precision));
  }
}

/**
 * Books socket message handler
 */
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

/**
 * Precision changed handler
 */
function* precisionChanged() {
  const chanId = yield select(state => state.books.chanId);
  const precision = yield select(state => state.books.precision);
  const symbol = yield select(state => state.symbols.selectedSymbol);
  const socket = yield select(state => state.socket);

  if (chanId && socket.open) {
    yield put(unsubscribeBooks(socket.socket, chanId));
  }
  if (symbol && socket.open) {
    yield put(subscribeBooks(socket.socket, symbol, precision));
  }
}

/** Sends books subscribe to socket */
function sendSubscribe(socket, symbol, precision) {
  socket.send(
    JSON.stringify({
      event: "subscribe",
      channel: "book",
      symbol: `t${symbol.toUpperCase()}`,
      freq: "F1",
      prec: `P${precision}`
    })
  );
}

/** Sends books unsubscribe to socket */
function sendUnsubscribe(socket, chanId) {
  socket.send(
    JSON.stringify({
      event: "unsubscribe",
      chanId: chanId
    })
  );
}

/**
 * Books api saga
 */
export default function* booksSaga() {
  yield all([
    takeEvery(types.SOCKET_OPEN, socketOpened),
    takeEvery(types.SELECT_SYMBOL, symbolSelected),
    takeEvery(types.SOCKET_MESSAGE, socketMessageReceived),
    takeEvery(types.BOOKS_PRECISION, precisionChanged),
    takeEvery(types.SUBSCRIBE_BOOKS_REQUESTED, action =>
      sendSubscribe(action.socket, action.symbol, action.precision)
    ),
    takeEvery(types.UNSUBSCRIBE_BOOKS_REQUESTED, action =>
      sendUnsubscribe(action.socket, action.chanId)
    )
  ]);
}
