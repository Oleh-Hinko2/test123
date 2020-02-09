import React from 'react';
import { Field } from 'react-final-form';
import Form from '../../../components/Form';
import {
  TextField, PasswordField,
} from '../../../components/Form/Inputs';
import {
  composeValidators,
  makeFormValidator,
  isNotEmail,
} from "./../../../components/Form/validation";
import { Button } from 'antd';
import {createUser, userSignIn, setInitialData} from '../../../redux/Login';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const texts = {
  email: `Email`,
  password: 'Password',
  registerTitle: 'Registration',
  loginTitle: 'Login'
}

class LoginForm extends Form {
  componentDidMount() {
    const {setInitialData} = this.props;
      setInitialData();
  }
 

  onValidate = makeFormValidator({
    email: composeValidators({
      'Required': value => value === undefined || value.toString().length === 0,
      "not email": isNotEmail
    }),
    password: composeValidators({
      'Required': value => value === undefined || value.toString().length === 0,
      '6 min ': value => value ? value.length < 6 : false,
    }),
  })

  handleRegister = () => {
    const {history: {push} } = this.props
    push("/register")
  }

  onSubmit = data => {
    const {email, password} = data
    const {match: { url }, history: {push}, createUser,  userSignIn  } = this.props;
    url === "/register" ? createUser({email, password}, push) : userSignIn({email, password}, push)
  }

  renderFields = () => {
    const {match: { url } } = this.props;
    const title = this.props.match.url === "/login" ?  texts.loginTitle : texts.registerTitle;
    return (
      <div className="c-form__item">
        <h3>{title}</h3>
        <Field
          className="c-form__field"
          name="email"
          component={TextField}
          label={texts.email}
        />
        <Field
          className="c-form__field"
          name="password"
          component={PasswordField}
          label={texts.password}
        />
        {url === "/login" ? <div><Button type="primary" onClick={this.handleRegister}>Register</Button></div>  : ""}
      </div>
    )
  }
}

const mapStateToProps = state => ({
 values: state.user,
});

const mapDispatchToProps = {
  createUser,
  userSignIn,
  setInitialData,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginForm));