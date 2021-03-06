import * as types from "../actions/actionTypes";
import initialState from "../store/initialState";

/**
 * Creates and return book data from snapshot
 * @param {object} snapshot
 */
function createBook(snapshot) {
  const book = {
    bids: {},
    asks: {}
  };

  snapshot.forEach(entry => {
    const price = entry[0];
    const count = entry[1];
    const amount = entry[2];
    const amountRounded = amount ? +Math.abs(amount).toFixed(2) : 0;
    const data = { price, count, amount: amountRounded };

    if (count === 0) return;
    if (amount > 0) book.bids[price] = data;
    else if (amount < 0) book.asks[price] = data;
  });

  sortBook(book);

  return book;
}

/**
 * Updates and returns update book.
 * @param {object} state - current books state
 * @param {object} update - update object
 */
function updateBook(state, update) {
  const book = {
    bids: { ...state.bids },
    asks: { ...state.asks }
  };

  const entry = update;
  const price = entry[0];
  const count = entry[1];
  const amount = entry[2];
  const amountRounded = amount ? +Math.abs(amount).toFixed(2) : 0;

  const data = { price, count, amount: amountRounded };

  if (count === 0) {
    if (amount > 0) delete book.bids[price];
    else if (amount < 0) delete book.asks[price];
  } else {
    if (amount > 0) book.bids[price] = data;
    else if (amount < 0) book.asks[price] = data;
  }

  sortBook(book);

  return book;
}

/**
 * Sorts bids and ask, and aggregates total amount on each layer
 * @param {object} book - book data
 */
function sortBook(book) {
  const bidPrices = Object.keys(book.bids).sort((a, b) => b - a);
  book.sortedBids = bidPrices.map(price => book.bids[price]);
  let bidTotal = 0;
  book.sortedBids.forEach(bid => {
    bidTotal += bid.amount;
    bidTotal = +bidTotal.toFixed(2);
    bid.total = bidTotal;
  });

  const askPrices = Object.keys(book.asks).sort((a, b) => a - b);
  book.sortedAsks = askPrices.map(price => book.asks[price]);
  let askTotal = 0;
  book.sortedAsks.forEach(ask => {
    askTotal += ask.amount;
    askTotal = +askTotal.toFixed(2);
    ask.total = askTotal;
  });

  book.total = bidTotal + askTotal;
}

/**
 * Book reducer
 * @param {object} state  - current state
 * @param {object} action - action
 */
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
    case types.BOOKS_ZOOM:
      let zoom = action.zoom;
      if (zoom < 1) zoom = 1;
      if (zoom > 5) zoom = 5;
      return {
        ...state,
        zoom: zoom
      };
    case types.BOOKS_PRECISION:
      let precision = action.precision;
      if (precision < 0) precision = 0;
      if (precision > 4) precision = 4;
      return {
        ...state,
        precision: precision
      };
    default:
      return state;
  }
}
