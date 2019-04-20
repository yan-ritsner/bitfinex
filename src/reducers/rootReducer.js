import { combineReducers } from "redux";
import symbols from "./symbolReducer";
import books from "./bookReducer";
import socket from "./socketReducer";

const rootReducer = combineReducers({
  symbols,
  books,
  socket
});

export default rootReducer;
