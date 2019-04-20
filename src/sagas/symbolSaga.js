import { call, put, takeEvery } from "redux-saga/effects";
import * as types from "../actions/actionTypes";
import {
  getSymbolsSucceeded,
  getSymbolsFailed
} from "../actions/symbolActions";
import request from "../network/request";

const apiUrl = "https://api.bitfinex.com/v1/symbols";

function* getSymbols() {
  try {
    const symbols = yield call(request, apiUrl);
    yield put(getSymbolsSucceeded(symbols));
  } catch (error) {
    yield put(getSymbolsFailed(error));
  }
}

/**
 * Symbols saga
 */
export default function* symbolSaga() {
  yield takeEvery(types.GET_SYMBOLS_REQUESTED, getSymbols);
}
