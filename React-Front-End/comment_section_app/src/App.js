import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: []
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">
            Real-time Comment Section
            <span className="px-2" role="img" aria-label="Chat">
              💬
            </span>
          </h1>
        </header>

        <div className="row">

        </div>
      </div>
    );
  }
}

export default App;
