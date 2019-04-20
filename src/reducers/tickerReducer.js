import * as types from "../actions/actionTypes";
import initialState from "../store/initialState";

function createTicker(data) {
  const bid = data[0];
  const bidSize = data[1];
  const ask = data[2];
  const askSize = data[3];
  const dailyChange = data[4];
  const dailyChangePerc = data[5];
  const lastPrice = data[6];
  const volume = data[7];
  const high = data[8];
  const low = data[9];

  const ticker = {
    bid,
    bidSize,
    ask,
    askSize,
    dailyChange,
    dailyChangePerc,
    lastPrice,
    volume,
    high,
    low
  };

  return ticker;
}

export default function tickerReducer(state = initialState.ticker, action) {
  switch (action.type) {
    case types.SUBSCRIBE_TICKER_REQUESTED:
      return { ...state, requested: true };
    case types.SUBSCRIBE_TICKER_SUCCEEDED:
      return {
        ...state,
        requested: false,
        subscribed: true,
        chanId: action.chanId
      };
    case types.SUBSCRIBE_TICKER_FAILED:
      return {
        ...state,
        requested: false,
        subscribed: false,
        failed: true,
        error: action.error
      };
    case types.UNSUBSCRIBE_TICKER_REQUESTED:
      return { ...state, requested: true };
    case types.UNSUBSCRIBE_TICKER_SUCCEEDED:
      return {
        ...state,
        requested: false,
        subscribed: false,
        chanId: null
      };
    case types.UNSUBSCRIBE_TICKER_FAILED:
      return {
        ...state,
        requested: false,
        subscribed: false,
        failed: true,
        error: action.error
      };
    case types.TICKER_UPDATE_RECEIVED:
      return {
        ...state,
        update: action.update,
        data: createTicker(action.update)
      };
    default:
      return state;
  }
}
