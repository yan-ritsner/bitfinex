import * as types from "../actions/actionTypes";
import initialState from "../store/initialState";

export default function symbolReducer(state = initialState.symbols, action) {
  switch (action.type) {
    case types.SYMBOLS_LOADED:
      return action.symbols;
    default:
      return state;
  }
}
