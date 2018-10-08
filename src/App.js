import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Realtime Footfall Analysis
          </p>
          <a
            className="App-link"
            href="https://github.com/real-time-footfall-analysis/rtfa-web"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Repo
          </a>
        </header>
      </div>
    );
  }
}

export default App;
