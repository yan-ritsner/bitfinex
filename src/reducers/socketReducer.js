import * as types from "../actions/actionTypes";
import initialState from "../store/initialState";

export default function socketReducer(state = initialState.socket, action) {
  switch (action.type) {
    case types.SOCKET_OPEN:
      return { ...state, socket: action.socket, open: true };
    case types.SOCKET_CLOSE:
      return { ...state, socket: null, open: false };
    case types.SOCKET_MESSAGE:
      return { ...state, message: action.message };
    default:
      return state;
  }
}
