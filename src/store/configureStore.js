import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import apiSaga from "../sagas";
import rootReducer from "../reducers";

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  );

  sagaMiddleware.run(apiSaga);

  return store;
}
