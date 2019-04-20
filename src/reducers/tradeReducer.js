import * as types from "../actions/actionTypes";
import initialState from "../store/initialState";
import { formatDate } from "../utils";

const maxSize = 25;

function createTrades(snapshot) {
  let trades = [];

  snapshot.forEach(entry => {
    const id = entry[0];
    const time = formatDate(new Date(entry[1]), "hh:mm:ss", true);
    const amount = entry[2];
    const price = entry[3];
    const data = { id, time, amount, price };
    trades.push(data);
  });

  if (trades.length > maxSize) {
    trades = trades.slice(0, maxSize);
  }
  return trades;
}

function updateTrades(state, updateType, update) {
  let trades = [...state.data];

  const entry = update;
  const id = entry[0];
  const time = formatDate(new Date(entry[1]), "hh:mm:ss", true);
  const amount = entry[2];
  const price = entry[3];
  const data = { id, time, amount, price };

  if (updateType === "te") {
    trades.unshift(data);
    // new trade
  } else if (updateType === "tu") {
    // update trade
    const index = trades.findIndex(trade => trade.id === id);
    if (index >= 0) trades[index] = data;
  }

  if (trades.length > maxSize) {
    trades = trades.slice(0, maxSize);
  }

  return trades;
}

export default function tradeReducer(state = initialState.trades, action) {
  switch (action.type) {
    case types.SUBSCRIBE_TRADES_REQUESTED:
      return { ...state, requested: true };
    case types.SUBSCRIBE_TRADES_SUCCEEDED:
      return {
        ...state,
        requested: false,
        subscribed: true,
        chanId: action.chanId
      };
    case types.SUBSCRIBE_TRADES_FAILED:
      return {
        ...state,
        requested: false,
        subscribed: false,
        failed: true,
        error: action.error
      };
    case types.UNSUBSCRIBE_TRADES_REQUESTED:
      return { ...state, requested: true };
    case types.UNSUBSCRIBE_TRADES_SUCCEEDED:
      return {
        ...state,
        requested: false,
        subscribed: false,
        chanId: null
      };
    case types.UNSUBSCRIBE_TRADES_FAILED:
      return {
        ...state,
        requested: false,
        subscribed: false,
        failed: true,
        error: action.error
      };
    case types.TRADES_SNAPSHOT_RECEIVED: {
      return {
        ...state,
        snapshot: action.snapshot,
        data: createTrades(action.snapshot)
      };
    }
    case types.TRADES_UPDATE_RECEIVED:
      return {
        ...state,
        update: action.update,
        data: updateTrades(state, action.updateType, action.update)
      };
    default:
      return state;
  }
}
