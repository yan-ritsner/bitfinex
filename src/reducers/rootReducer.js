import { combineReducers } from "redux";
import socket from "./socketReducer";
import symbols from "./symbolReducer";
import books from "./bookReducer";
import ticker from "./tickerReducer";
import trades from "./tradeReducer";

/**
 * Root Combined Reducer
 */
const rootReducer = combineReducers({
  socket,
  symbols,
  books,
  ticker,
  trades
});

export default rootReducer;
