import React, { Component } from 'react';
import firebase from 'firebase';
import logo from './logo.svg';
import './App.css';
import fb from './config';

import Chatroom from './Chatroom';

class App extends Component {
  // componentDidMount(){
  //   console.log(firebase.database(), 'ref')
  //   // if(!firebase)
  //   firebase.database().ref('users/2').set({
  //     username: 'y',
  //     email: 'yo@yo.co'
  //   })
  // }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Chatroom />

      </div>
    );
  }
}

export default App;
