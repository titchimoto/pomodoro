import React, { Component } from 'react';
import './App.css';
import Timer from './components/Timer'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Motodoro Timer</h1>
        </header>

        <Timer key="index"/>
      </div>
    );
  }
}

export default App;
