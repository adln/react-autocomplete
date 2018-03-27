import React, { Component } from 'react';

import './App.css';
import { Autocomplete } from './Components/Autocomplete';

class App extends Component {
  render() {
    return (
      <div className="App container">
        <Autocomplete />
      </div>
    );
  }
}

export default App;
