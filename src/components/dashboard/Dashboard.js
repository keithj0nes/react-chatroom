import React from 'react';
import firebase from 'firebase';

class Dashboard extends React.Component {

  signOut(){
    //get user id
    const userId = firebase.auth().currentUser.uid;
    let updates = {};
    updates[`/users/${userId}/isOnline`] = false;
    updates[`/online-users/${userId}`] = null;
    firebase.database().ref().update(updates).then(()=>{
      return firebase.auth().signOut();
    });

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
