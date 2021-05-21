import React, { Component } from "react";
import JokeList from "./components/JokeList";

class App extends Component {
  render() {
    return (
      <div className="app">
        <JokeList />
      </div>
    );
  }
}

export default App;
