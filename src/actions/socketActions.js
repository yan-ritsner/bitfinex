import * as types from "./actionTypes";

export function socketOpen(socket) {
  return { type: types.SOCKET_OPEN, socket: socket };
}

export function socketClose() {
  return { type: types.SOCKET_CLOSE };
}

export function socketMessage(message) {
  return { type: types.SOCKET_MESSAGE, message: message };
}
