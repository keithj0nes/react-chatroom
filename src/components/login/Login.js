import React from 'react';
import firebase from 'firebase';

class Login extends React.Component {

  constructor(){
    super();

    this.state = {
      formType: 'login',
      email: '',
      password: '',
      name: '',
      displayName: ''
    }
  }

  handleSubmit = (type, e) => {
    console.log(type, 'tyep');
    e.preventDefault();
    console.log(this.state);

    if(this.state.formType === 'login'){
      // login //
      firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((user) =>{
        firebase.database().ref(`users/${user.uid}`).once('value').then((snapshot) => {
          let account = snapshot.val();
          account.isOnline = true;
          //update two routes using ref().update()
          let updates = {};
          updates[`/users/${user.uid}/isOnline`] = true;
          updates[`/online-users/${user.uid}`] = account;

          return firebase.database().ref().update(updates);
        })
      })
      .catch(err => console.log(err, 'login err'));

    } else {
      // signup //
      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((user) => {
          return user.updateProfile({displayName: this.state.displayName, photoURL: "https://www.vccircle.com/wp-content/uploads/2017/03/default-profile.png"}).then(() => {
            let account = {};
            account.uid = user.uid;
            account.email = this.state.email.toLowerCase();
            account.name = this.state.name;
            account.displayName = this.state.displayName;
            account.timeZone =  Intl.DateTimeFormat().resolvedOptions().timeZone;
            account.isOnline = true;
            account.photoURL = "https://www.vccircle.com/wp-content/uploads/2017/03/default-profile.png";

            //update two routes using ref().update()
            let updates = {};
            updates[`/users/${user.uid}`] = account;
            updates[`/online-users/${user.uid}`] = account;

            return firebase.database().ref().update(updates);
          });
      })
      .catch(error => console.log(error, 'signup err'));
    }


  }

  handleInputChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }


  // Intl.DateTimeFormat().resolvedOptions().timeZone
  handleFormType = () => {
    if(this.state.formType === 'login'){
      this.setState({formType: 'signUp'})
    } else {
      this.setState({formType: 'login'})
    }
  }
  render(){

    const formTypeText = this.state.formType === 'login' ? 'Login' : 'Sign Up';

    return (
      <div>

      <h1>Hello from Login</h1>

        <form onSubmit={(e)=>this.handleSubmit(this.state.formType, e)}>

          <h2>{formTypeText}</h2>
          {this.state.formType === 'login' ?

            <div>
              <input type="text" value={this.state.email} name="email" onChange={this.handleInputChange}/>
              <input type="text" value={this.state.password} name="password" onChange={this.handleInputChange}/>
            </div>

          :

            <div>
              <input type="text" value={this.state.name} name="name" onChange={this.handleInputChange} placeholder="name"/>
              <input type="text" value={this.state.displayName} name="displayName" onChange={this.handleInputChange} placeholder="display name"/>
              <input type="text" value={this.state.email} name="email" onChange={this.handleInputChange} placeholder="email"/>
              <input type="text" value={this.state.password} name="password" onChange={this.handleInputChange} placeholder="password (6 characters)"/>
            </div>
          }





          <button>Submit</button>

          <button type="button" onClick={this.handleFormType}>Change to {formTypeText}</button>
        </form>
      </div>
    )
  }
}

export default Login;
