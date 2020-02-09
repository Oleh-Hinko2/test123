import React, { Component } from 'react';
import { Form as FinalForm } from 'react-final-form';
import {Button} from "antd";

export default class Form extends Component {

  title = ''
  btnText = 'Save'
  cancelBtnText = 'Cancel'

  componentDidMount() {
    let { getData, setInitialData, data, match: { params: { id }, url }, history: {push},  } = this.props;
    console.log(this.props)
    if (url !== "/login" || url !== "/register") {
      id ? getData() : setInitialData();
    }
     else if(data.length ){
        const currentData = data.find(item => item.id === parseInt(id))
        id ? getData(currentData.dataID) : setInitialData();
      } else {
        push('/')
      }
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
    const { editData, addData, data, history: { push }, match: { params: { id } } } = this.props;
    if(data.length){
      props.active = data.active === "" ? false : true;
      if (id) {
        const currentData = data.find(item => item.id === parseInt(id))
        props.dataID = currentData.dataID;
        editData(props, push) 
      } else {
        addData(props, push)
      }
    } else {
      push('/')
    }
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