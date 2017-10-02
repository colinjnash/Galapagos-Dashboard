import React, { Component } from 'react';
import fire from './fire';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Turtles 3 App Project</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
 
         This is officially now in Act II Development. Building input components with  a single task query, that will lead to welcome
        screen with static time stamp will be the first components, due sometime soon! 
      
         Come back soon and see what we've done!</p>
      </div>
    );
  }
}

export default App;
