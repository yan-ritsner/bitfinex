import * as types from "./actionTypes";

export function getSymbols() {
  return { type: types.GET_SYMBOLS_REQUESTED };
}

export function getSymbolsSucceeded(symbols) {
  return { type: types.GET_SYMBOLS_SUCCEEDED, symbols: symbols };
}

export function getSymbolsFailed(error) {
  return { type: types.GET_SYMBOLS_FAILED, error: error };
}

export function selectSymbol(symbol) {
  return { type: types.SELECT_SYMBOL, symbol: symbol };
}
