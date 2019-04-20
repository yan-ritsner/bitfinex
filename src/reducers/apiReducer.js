import * as types from "../actions/actionTypes";
import initialState from "../store/initialState";

export default function apiReducer(state = initialState.apiProgress, action) {
  if (action.type == types.BEGIN_API_CALL) {
    return state + 1;
  } else if (
    action.type === types.END_API_CALL ||
    action.type === types.ERROR_API_CALL
  ) {
    return state - 1;
  }
  return state;
}
