import { combineReducers } from "redux";
import symbols from "./symbolReducer";
import apiProgress from "./apiReducer";

const rootReducer = combineReducers({
  symbols,
  apiProgress
});

export default rootReducer;
