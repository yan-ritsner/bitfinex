import React, { Component } from "react";
import "./App.css";
import SymbolSelector from "./components/SymbolSelector";
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <SymbolSelector />
        </header>
      </div>
    );
  }
}

export default App;
