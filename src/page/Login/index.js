import React, {Component} from 'react';
import LoginForm from './LoginForm';
import "./index.scss";

class Login extends Component {
  render() {
    return (
      <div className="login-page">
        <LoginForm/>
      </div>
    );
  }
}

export default Login;