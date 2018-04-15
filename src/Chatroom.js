import React from 'react';
import firebase from 'firebase';
import './chatroom.css';

class Chatroom extends React.Component{

  constructor(){
    super();

    this.state = {
      messages: [],
      user: {
        name: 'keith'
      },
      userMessage: ''
    }
  }


  handleInput = (e) => {
    this.setState({userMessage: e.target.value})
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log('submititing');
    console.log(firebase.database().ref('chatroom'));
    firebase.database().ref('chatroom').push().set({
      author: this.state.user.name,
      message: this.state.userMessage
    })
  }

  render(){
    return (
      <div className="chatroom">
        <ul className="chat-box">

          {this.state.messages.map((item, index) =>{
            console.log(item, 'item');
            return (<li>hi</li>)
          })}
        </ul>

          <form className="add-message-form" onSubmit={this.handleSubmit}>
            <input type="text" value={this.state.userMessage} onChange={this.handleInput}/>
            <button>Submit</button>
          </form>

      </div>
    )
  }
}

export default Chatroom;
