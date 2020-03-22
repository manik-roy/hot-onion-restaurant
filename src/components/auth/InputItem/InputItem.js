import React from 'react';
import './InputItem.css'
const InputItem = ({onchangeHandler, ...rest}) => {
  return (
    <div className="form-group">
      {/* <input type={type} value={value} className="form-control" name={name} placeholder={placeholder}/> */}
      <input {...rest} onChange={onchangeHandler} className="form-control"/>
    </div>
  );
};

export default InputItem;