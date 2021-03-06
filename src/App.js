import React, { Component } from "react";
import "./App.css";
import SymbolSelector from "./components/SymbolSelector";
import BookView from "./components/BookView";
import TickerView from "./components/TickerView";
import TradeView from "./components/TradeView";
import ZoomView from "./components/ZoomView";
import PrecisionView from "./components/PrecisionView";

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="app-header">
          <SymbolSelector />
          <ZoomView />
          <PrecisionView />
        </div>
        <div className="app-content">
          <TickerView />
          <div className="app-book-trade-container">
            <div>
              <BookView />
            </div>
            <div>
              <TradeView />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
