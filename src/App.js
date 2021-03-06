import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import 'firebase/auth';
import './App.css';
import {Layout, Icon} from 'antd';
import Emp from './page/Emp/index.js';
import Login from './page/Login';
import { connect } from 'react-redux';
import LogOut from './components/Logout';
import EmpForm from './page/Emp/EmpForm';
import EmpDetails from './page/Emp/EmpDetails';

const { Header, Content } = Layout;

class App extends Component {
  render() {
    return (
      <Router>
          <Layout>
              <Header>
                <Icon type="weibo" />
                <LogOut/>
              </Header>
              <Content>
                <Switch>
                  <Route exact path="/" component={Emp}/>
                  <Route exact path="/:action(edit|add)/:id?" component={EmpForm}/> 
                  <Route exact path="/details/:id?" component={EmpDetails}/> 
                </Switch>
              </Content>
            </Layout>
      </Router>
    );
  }
}

const AppRouter = ({isAuth}) => {
  return(
    <Router>
    <Switch>
      <Route path="/login"
        render={props =>
          isAuth ? (
            <Redirect to={{ pathname: '/'}} />
          ) : (
            <Login {...props} />
          )
        }
      />
      <Route path="/register"
        render={props =>
          isAuth ? (
            <Redirect to={{ pathname: '/'}} />
          ) : (
            <Login {...props} />
          )
        }
      />
      <Route 
        path="/"
        render={props =>
          isAuth ? (
            <App {...props} />
          ) : (
            <>
              <Redirect from='/register' to='/login'  />
            </>
          )
        }
      />
    </Switch>
  </Router>
  )
};

const mapStateToProps = state => ({
  isAuth: state.user.isAuth
})

export default connect(mapStateToProps, null)(AppRouter);