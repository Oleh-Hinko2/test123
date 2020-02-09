import React from 'react';
import { Checkbox } from 'antd';

const CheckboxField = ({ input, meta, label = "", ...props }) => {
  return (
    <span className='c-form__checkbox'>
      <Checkbox
        {...input}
        {...props}
      />
      <label>{label}</label>
      <div className="ant-form-explain">
        {meta.touched ? meta.error : ''}
      </div>
    </span>
  );
};


export default CheckboxField;