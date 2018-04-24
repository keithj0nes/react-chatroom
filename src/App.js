import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import fbase from './config';

import Chatroom from './components/chatroom/Chatroom';
import Login from './components/login/Login';

class App extends Component {
  // componentDidMount(){
  //   console.log(firebase.database(), 'ref')
  //   // if(!firebase)
  //   firebase.database().ref('users/2').set({
  //     username: 'y',
  //     email: 'yo@yo.co'
  //   })
  // }

  constructor(){
    super();

    this.state = {
      user: true
    }
  }


render(){
  return (

    <BrowserRouter>

        <Switch>
          <Route exact path="/" component={() => !this.state.user ? <Login /> : <Redirect to="/dashboard"/>}/>

          <Route exact path="/dashboard" component={Chatroom}/>

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
