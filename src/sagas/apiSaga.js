import { all } from "redux-saga/effects";
import symbolSaga from "./symbolSaga";

export default function* apiSaga() {
  yield all([symbolSaga()]);
}
