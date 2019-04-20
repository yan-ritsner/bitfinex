import React, { Component } from "react";
import "./App.css";
import SymbolSelector from "./components/SymbolSelector";
import BookView from "./components/BookView";
class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="app-header">
          <SymbolSelector />
        </div>
        <div className="app-content">
          <BookView />
        </div>
      </div>
    );
  }
}

export default App;
