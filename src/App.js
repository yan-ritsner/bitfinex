import React, { Component } from "react";
import "./App.css";
import SymbolSelector from "./components/SymbolSelector";
import BookView from "./components/BookView";
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <SymbolSelector />
        </header>
        <BookView />
      </div>
    );
  }
}

export default App;
