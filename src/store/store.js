import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import Api from "../api";

const api = new Api();

export default function store(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk.withExtraArgument(api))
  );
}
