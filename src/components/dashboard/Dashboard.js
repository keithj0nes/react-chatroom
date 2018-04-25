import React from 'react';
import firebase from 'firebase';

class Dashboard extends React.Component {


  signOut(){
    return firebase.auth().signOut().then(()=>{
      console.log('signed out successfully');
    })
  }
  render(){
    return (
      <div>
      <h2>Hello from Dashboard</h2>
      <button onClick={this.signOut}>Sign Out</button>
      </div>
    )
  }
}

export default Dashboard;
