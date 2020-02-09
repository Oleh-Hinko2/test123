import React, { Component } from 'react';
import { Icon, Button } from 'antd';
import { connect } from 'react-redux';
import { clearUserData } from '../../redux/Login';


class LogOut extends Component {
  render() {
    return (
      <Button onClick={this.props.clearUserData}>
        <Icon type="logout" />
      </Button>
    )
  }
};

const mapDispatchToProps = {
  clearUserData
}

export default connect(null, mapDispatchToProps)(LogOut);