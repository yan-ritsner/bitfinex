import { call, put, takeEvery } from "redux-saga/effects";
import * as types from "../actions/actionTypes";
import {
  getSymbolsSucceeded,
  getSymbolsFailed
} from "../actions/symbolActions";
import request from "../network/request";

function* getSymbols() {
  try {
    const symbols = yield call(request, "symbols");
    yield put(getSymbolsSucceeded(symbols));
  } catch (error) {
    yield put(getSymbolsFailed(error));
  }
}

export default function* symbolSaga() {
  yield takeEvery(types.GET_SYMBOLS_REQUESTED, getSymbols);
}
