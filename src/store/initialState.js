/**
 * Store initial state
 */
export default {
  symbols: {
    requesting: false,
    failed: false,
    error: null,
    data: [],
    selectedSymbol: "btcusd"
  },
  socket: {
    socket: null,
    open: false,
    message: null
  },
  books: {
    requested: false,
    subscribed: false,
    failed: false,
    error: null,
    snapshot: null,
    update: null,
    bids: {},
    asks: {},
    sortedBids: [],
    sortedAsks: [],
    total: 0,
    chanId: null,
    zoom: 1,
    precision: 0
  },
  ticker: {
    requested: false,
    subscribed: false,
    failed: false,
    error: null,
    update: null,
    updateType: "",
    data: {},
    chanId: null
  },
  trades: {
    requested: false,
    subscribed: false,
    failed: false,
    error: null,
    snapshot: null,
    update: null,
    data: [],
    chanId: null
  }
};
