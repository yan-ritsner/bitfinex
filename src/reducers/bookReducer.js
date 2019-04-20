import * as types from "../actions/actionTypes";
import initialState from "../store/initialState";

function createBook(snapshot) {
  const book = {
    bids: {},
    asks: {}
  };

  snapshot.forEach(entry => {
    const price = entry[0];
    const count = entry[1];
    const amount = entry[2];
    const data = { price, count, amount };

    if (count === 0) return;
    if (amount > 0) book.bids[price] = data;
    else if (amount < 0) book.asks[price] = data;
  });

  return book;
}

function updateBook(state, update) {
  const book = {
    bids: { ...state.bids },
    asks: { ...state.asks }
  };

  const entry = update;
  const price = entry[0];
  const count = entry[1];
  const amount = entry[2];
  const data = { price, count, amount };

  if (count === 0) {
    if (amount > 0) delete book.bids[price];
    else if (amount < 0) delete book.asks[price];
  } else {
    if (amount > 0) book.bids[price] = data;
    else if (amount < 0) book.asks[price] = data;
  }

  return book;
}

export default function bookReducer(state = initialState.books, action) {
  switch (action.type) {
    case types.SUBSCRIBE_BOOKS_REQUESTED:
      return { ...state, requested: true };
    case types.SUBSCRIBE_BOOKS_SUCCEEDED:
      return {
        ...state,
        requested: false,
        subscribed: true,
        chanId: action.chanId
      };
    case types.SUBSCRIBE_BOOKS_FAILED:
      return {
        ...state,
        requested: false,
        subscribed: false,
        failed: true,
        error: action.error
      };
    case types.UNSUBSCRIBE_BOOKS_REQUESTED:
      return { ...state, requested: true };
    case types.UNSUBSCRIBE_BOOKS_SUCCEEDED:
      return {
        ...state,
        requested: false,
        subscribed: false,
        chanId: null
      };
    case types.UNSUBSCRIBE_BOOKS_FAILED:
      return {
        ...state,
        requested: false,
        subscribed: false,
        failed: true,
        error: action.error
      };
    case types.BOOKS_SNAPSHOT_RECEIVED: {
      return {
        ...state,
        snapshot: action.snapshot,
        ...createBook(action.snapshot)
      };
    }
    case types.BOOKS_UPDATE_RECEIVED:
      return {
        ...state,
        update: action.update,
        ...updateBook(state, action.update)
      };
    default:
      return state;
  }
}
