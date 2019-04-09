import React, { Component } from 'react';
import Login from './components/Login';
import Register from './components/Register';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Login />
        <Register />
      </div>
    );
  }
}

export default App;
