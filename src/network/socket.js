export default class Socket {
  url = null;
  socket = null;
  log = false;
  reconnect = true;
  reconnectInterval = 1000;
  reconnectTimeout = null;
  forcedDisconnect = false;
  open = false;

  constructor(url) {
    this.url = url;
  }

  connect() {
    this.socket = new WebSocket(this.url);
    this.socket.onopen = e => this.wsOpen(e);
    this.socket.onclose = e => this.wsClose(e);
    this.socket.onerror = e => this.wsError(e);
    this.socket.onmessage = e => this.wsMessage(e);
    this.forcedDisconnect = false;
  }

  disconnect() {
    this.forcedDisconnect = true;
    if (this.socket) {
      this.socket.close();
    }
  }

  wsOpen() {
    if (this.log) {
      console.log(`SocketOpen: ${this.socket.url}`);
    }
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }
    this.open = true;
    this.onopen();
  }

  wsClose() {
    if (this.log) {
      console.log(`SocketClose: ${this.socket.url}`);
    }
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }
    if (this.reconnect && !this.forcedDisconnect) {
      this.reconnectTimeout = setTimeout(
        () => this.connect(),
        this.reconnectInterval
      );
    }
    this.open = false;
    this.onclose();
  }

  wsError(event) {
    if (this.log) {
      console.log(`SocketError: ${event}`);
    }
    this.onerror(event);
  }

  wsMessage(event) {
    if (this.log) {
      console.log(`SocketMessage: ${event.data}`);
    }
    this.onmessage(event);
  }

  onopen = function(event) {};

  onerror = function(event) {};

  onclose = function(event) {};

  onmessage = function(event) {};

  send(data) {
    if (this.socket) {
      this.socket.send(data);
    }
  }
}
