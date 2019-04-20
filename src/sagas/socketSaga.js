import { put, call, take } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import {
  socketOpen,
  socketClose,
  socketMessage
} from "../actions/socketActions";
import Socket from "../network/socket";

const socketUrl = "wss://api-pub.bitfinex.com/ws/2";
const socket = new Socket(socketUrl);

function initSocket() {
  return eventChannel(emitter => {
    //socket open
    socket.onopen = () => {
      return emitter(socketOpen(socket));
    };

    //socket closed
    socket.onclose = () => {
      return emitter(socketClose());
    };

    //socket message received
    socket.onmessage = e => {
      let msg = null;
      try {
        msg = JSON.parse(e.data);
      } catch (e) {
        console.error(`Error parsing: ${e.data}`);
      }
      if (msg) {
        if (msg.event === "error") {
          console.error(`Error: code: ${msg.code}, msg:${msg.msg}`);
        } else {
          return emitter(socketMessage(msg));
        }
      }
    };

    //connect socket
    socket.connect();

    //disconnect socket on unsubscribe
    return () => {
      socket.disconnect();
    };
  });
}

/**
 * Socket saga
 */
export default function* socketSaga() {
  const channel = yield call(initSocket);
  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}
