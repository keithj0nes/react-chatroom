import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import fbase from './config';
import firebase from 'firebase';


import Dashboard from './components/dashboard/Dashboard';
import Login from './components/login/Login';

class App extends Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user, 'user in onAuthStateChanged');
        this.setState({user})
      } else {
        console.log("No user signed in");
        this.setState({user: null})
      }
    });
  }

  constructor(){
    super();

    this.state = {
      user: null
    }
  }


render(){
  return (

    <BrowserRouter>

        <Switch>
          <Route exact path="/" component={() => !this.state.user ? <Login /> : <Redirect to="/dashboard"/>}/>
          <Route exact path="/dashboard" component={() => this.state.user ? <Dashboard /> : <Redirect to="/"/>}/>
          <Route component={() => !this.state.user ? <Login /> : <Redirect to="/dashboard"/>}/>
        </Switch>

    </BrowserRouter>

  )

}

  // render() {
  //   return (
  //     <div className="App">
  //       <header className="App-header">
  //         <img src={logo} className="App-logo" alt="logo" />
  //         <h1 className="App-title">Welcome to React</h1>
  //       </header>
  //       <Chatroom />
  //
  //     </div>
  //   );
  // }
}

export default App;
