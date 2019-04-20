import { all } from "redux-saga/effects";
import socketSaga from "./socketSaga";
import symbolSaga from "./symbolSaga";
import bookSaga from "./bookSaga";
import tickerSaga from "./tickerSaga";
import tradeSaga from "./tradeSaga";

/**
 * Root api calls saga
 */
export default function* apiSaga() {
  yield all([
    socketSaga(),
    symbolSaga(),
    bookSaga(),
    tickerSaga(),
    tradeSaga()
  ]);
}
