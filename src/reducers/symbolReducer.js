import * as types from "../actions/actionTypes";
import initialState from "../store/initialState";

const defaultSymbols = ["btcusd", "ethusd"];

export default function symbolReducer(state = initialState.symbols, action) {
  switch (action.type) {
    case types.GET_SYMBOLS_REQUESTED:
      return {
        ...state,
        requesting: true,
        failed: false,
        error: null
      };
    case types.GET_SYMBOLS_SUCCEEDED:
      return {
        ...state,
        requesting: false,
        data: action.symbols
      };
    case types.GET_SYMBOLS_FAILED:
      return {
        ...state,
        requesting: false,
        failed: true,
        error: action.error,
        data: defaultSymbols
      };
    case types.SELECT_SYMBOL:
      return {
        ...state,
        selectedSymbol: action.symbol
      };
    default:
      return state;
  }
}
