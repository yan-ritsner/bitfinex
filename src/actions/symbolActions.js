import * as types from "./actionTypes";
import { beginApiCall, endApiCall, errorApiCall } from "./apiActions";

export function symbolsLoaded(symbols) {
  return { type: types.SYMBOLS_LOADED, symbols };
}

export function loadSymbols() {
  return function(dispatch, _, api) {
    dispatch(beginApiCall());
    return api
      .getSymbols()
      .then(symbols => {
        dispatch(endApiCall());
        dispatch(symbolsLoaded(symbols));
      })
      .catch(error => {
        dispatch(errorApiCall(error));
        throw error;
      });
  };
}
