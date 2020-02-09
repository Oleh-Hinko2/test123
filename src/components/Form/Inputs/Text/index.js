import React from 'react';
import { Input } from 'antd';

const TextField = ({ input, meta, label = "", ...props }) => {
  const errorText = meta.error ? meta.error : '';
  const isValid = meta.touched ? errorText : '';
  return (
    <span className={isValid.length > 0 ? 'has-error' : ''}>
      <label >{label}</label>
      <Input
        {...input}
        {...props}
      />
      <div className="ant-form-explain">
        {meta.touched ? meta.error : ''}
      </div>
    </span>
  );
};


export default TextField;