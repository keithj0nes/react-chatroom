import React from 'react';
import './message.css';
const Message = ({message}) => (


  <li>
    <p className="author">{message.author}</p>
    <p ><span className="message">{message.message}</span></p>
  </li>
)


export default Message;
