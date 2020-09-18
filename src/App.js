import React, { Component } from 'react';
import Signin from './signin/sigin.component'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Signin></Signin>
        </div>
      </Router>
    );
  }
}

export default App;
