import { all } from "redux-saga/effects";
import socketSaga from "./socketSaga";
import symbolSaga from "./symbolSaga";
import bookSaga from "./bookSaga";

export default function* apiSaga() {
  yield all([socketSaga(), symbolSaga(), bookSaga()]);
}
