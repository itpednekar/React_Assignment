import React, { Component } from 'react';
import Signin from './signin/sigin.component'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Home from './home/home.component';
import {withRouter, BrowserRouter } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn : false
    }
  }
  login(valid){
    if(valid == true){
      this.setState({ isLoggedIn : true })
    }
  }
  render() {
    let {isLoggedIn} =  this.state
    return (
      <Router>
        <div className="App">
          {
            !isLoggedIn ? <Signin login={(valid)=>this.login(valid)} ></Signin> : <Home></Home>
          }
        </div>
      </Router>
    );
  }
}

export default App;
