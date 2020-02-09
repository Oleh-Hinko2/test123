import React from 'react';
import { connect } from 'react-redux';
import { Field } from 'react-final-form';
import Form from '../../../components/Form';
import {
TextField, Checkbox
} from '../../../components/Form/Inputs';
import {
  composeValidators,
  isEmpty,
  makeFormValidator,
} from "../../../components/Form/validation";
import {getEmp, addEmp, setInitialEmp, editEmp} from '../../../redux/Emp';

const texts = {
  name: `EmpName`,
  active: 'EmpEctive',
  department: 'EmpDepartment',
  editTitle: 'Edit information by emp',
  createTitle: 'New emp'
}

class EmpForm extends Form {

  title = this.props.match.params.id !== undefined ? texts.editTitle : texts.createTitle;

  onValidate = makeFormValidator({
    name: composeValidators({
      'Required': isEmpty,
      '3 min ': value => value.length < 3,
    }),
    department: composeValidators({
      'Required': isEmpty,
      '3 min ': value => value.length < 3,
    }),
  })



  renderFields = () => {
    return (
      <div className="c-form__item">
        <Field
          className="c-form__field"
          name="name"
          component={TextField}
          label={texts.name}
        />
        <Field
          className="c-form__field"
          name="active"
          component={Checkbox}
          label={texts.active}
          type="checkbox"
        />
         <Field
          className="c-form__field"
          name="department"
          component={TextField}
          label={texts.department}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  values: state.emp.initialValues,
});

const mapDispatchToProps = {
  getData: getEmp,
  addData: addEmp,
  setInitialData: setInitialEmp,
  editData: editEmp
};

export default connect(mapStateToProps, mapDispatchToProps)(EmpForm);