import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getEmp} from '../../../redux/Emp'
 
 class EmpDetails extends Component {
  componentDidMount() {
    const { getEmp, data, match: { params: { id } }, history: {push} } = this.props;
      if(data.length){
        const currentData = data.find(item => item.id === parseInt(id))
        id && getEmp(currentData.dataID)
      } else {
        push('/')
      }
  }

  render() {
    const {id, active, department, name} = this.props.values
    return (
     <div>
        <p>EmpID: {id}</p> 
        <p>Name: {name}</p>
        <p>Department: {department}</p>
        <p>Is active: {active ? "Active" : "Blocked"}</p>
     </div>
    )
  }
}

const mapStateToProps = state => ({
  values: state.emp.initialValues,
  data: state.emp.data
});

const mapDispatchToProps = {
 getEmp,
};

export default connect(mapStateToProps, mapDispatchToProps)(EmpDetails)
