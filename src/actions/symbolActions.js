import * as types from "./actionTypes";

/**
 * Get available symbol
 */
export function getSymbols() {
  return { type: types.GET_SYMBOLS_REQUESTED };
}

/**
 * Symbols retrieval succeeded
 * @param {array} symbols - symbols array
 */
export function getSymbolsSucceeded(symbols) {
  return { type: types.GET_SYMBOLS_SUCCEEDED, symbols: symbols };
}

/**
 * Symbols retrieval failed
 * @param {string} error - error
 */
export function getSymbolsFailed(error) {
  return { type: types.GET_SYMBOLS_FAILED, error: error };
}

/**
 * Select specific symbol
 * @param {string} symbol
 */
export function selectSymbol(symbol) {
  return { type: types.SELECT_SYMBOL, symbol: symbol };
}
