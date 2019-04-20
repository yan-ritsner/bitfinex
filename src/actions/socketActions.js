import * as types from "./actionTypes";

/**
 * Socket open event
 * @param {socket} socket - socket instance
 */
export function socketOpen(socket) {
  return { type: types.SOCKET_OPEN, socket: socket };
}

/**
 * Socket close event
 */
export function socketClose() {
  return { type: types.SOCKET_CLOSE };
}

/**
 * Socket message event
 * @param {object} socket - socket message
 */
export function socketMessage(message) {
  return { type: types.SOCKET_MESSAGE, message: message };
}
