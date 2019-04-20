export default {
  symbols: {
    requesting: false,
    failed: false,
    error: null,
    data: [],
    selectedSymbol: null
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
    chanId: null
  },
  socket: {
    socket: null,
    open: false,
    message: null
  }
};
