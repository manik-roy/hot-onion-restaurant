import React from 'react';
import './InputItem.css'
const InputItem = ({name, type, placeholder}) => {
  return (
    <div className="form-group">
      <input type={type} className="form-control" name={name} placeholder={placeholder}/>
    </div>
  );
};

export default InputItem;