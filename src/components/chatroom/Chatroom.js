import React from 'react';
import Message from '../message/Message'
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

  componentDidMount(){
    // firebase.database().ref('chatroom').once('value').then((snapshot) => {
    //   const messages = snapshot.val();
    //   this.setState({messages})
    // })
    this.setMessages()
  }

  setMessages = () => {
    console.log('setMessages');
    firebase.database().ref('chatroom').once('value').then((snapshot) => {
      const messages = snapshot.val();
      this.setState({messages})
    })
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
    this.setState({userMessage: ''})
    this.setMessages()

  }

  render(){
    return (
      <div className="chatroom">
        <ul className="chat-box">

          {this.state.messages && Object.keys(this.state.messages).map((message, i) =>{
            console.log(this.state.messages[message], 'item');
            return (<Message key={i} message={this.state.messages[message]}/>)
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
