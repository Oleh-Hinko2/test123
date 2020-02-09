import React, { Component } from 'react';
import { Form as FinalForm } from 'react-final-form';
import {Button} from "antd";

export default class Form extends Component {

  title = ''
  btnText = 'Save'
  cancelBtnText = 'Cancel'

  componentDidMount() {
     const { getData, setInitialData, match: { params: { id } } } = this.props;
     id ? getData(id) : setInitialData();
    console.log(this.props)
  }

  renderForm = props => {
    const { handleSubmit } = props;
    return (
      <form onSubmit={handleSubmit}>
        {this.renderFields(props)}
        <div className="c-form__item-submit">
          <button type="submit">{this.btnText}</button>
          <Button type="danger" onClick={() => this.props.history.goBack()}>{this.cancelBtnText}</Button>
        </div>
      </form>
    )
  }

  onSubmit = props => {
    console.log(props)
    const { editData,addData, history: { goBack }, match: { params: { id } } } = this.props;
    id ? editData({ id, data: props}, goBack) : addData(props)
  }

  getFormValues = () => this.props.values;

  render() {
    return (
      <section className="main-content__form">
        <h3 className="main-content__form-title">{this.title}</h3>
        <FinalForm
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          initialValues={this.getFormValues()}
          validate={this.onValidate}
          render={this.renderForm}
        />
      </section>
    )
  }
}