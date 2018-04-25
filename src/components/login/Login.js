import React from 'react';

class Login extends React.Component {

  constructor(){
    super();

    this.state = {
      email: '',
      password: ''
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
  }

  handleInputChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }
  render(){
    return (
      <div>

      <h1>Hello from Login</h1>

        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.email} name="email" onChange={this.handleInputChange}/>
          <input type="text" value={this.state.password} name="password" onChange={this.handleInputChange}/>

          <button>Submit</button>
        </form>
      </div>
    )
  }
}

export default Login;
