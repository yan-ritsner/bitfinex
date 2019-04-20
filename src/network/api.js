import Socket from "./socket";

export default class Api {
  symbolsUrl = "https://api.bitfinex.com/v1/symbols";
  socketUrl = "wss://api-pub.bitfinex.com/ws/2";
  socket = null;

  constructor() {
    this.socket = new Socket(this.socketUrl);
    this.socket.onopen = event => this.onopen(event);
    this.socket.onclose = event => this.onclose(event);
    this.socket.onmessage = event => this.onmessage(event);
  }

  connect() {
    this.socket.connect();
  }

  disconnect() {
    this.socket.disconnect();
  }

  onopen(event) {}

  onclose(event) {}

  onmessage(event) {}

  get canSend() {
    if (!this.socket.open) {
      console.error("Cannot send message: socket is closed");
      return false;
    }
    return true;
  }

  getSymbols() {
    return fetch(this.symbolsUrl)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  subscribeBook(symbol) {
    if (!this.canSend) return;
    this.socket.send(
      JSON.stringify({
        event: "subscribe",
        channel: "book",
        symbol: symbol
      })
    );
  }

  unsubscribeBook(channelId) {
    if (!this.canSend) return;
    this.socket.send(
      JSON.stringify({
        event: "unsubscribe",
        chanId: channelId
      })
    );
  }

  async handleResponse(response) {
    if (response.ok) return response.json();
    if (response.status === 400) {
      const error = await response.text();
      throw new Error(error);
    }
    throw new Error("Network response was not ok.");
  }

  handleError(error) {
    console.error("API call failed. " + error);
    throw error;
  }
}
