import React from "react";

export const CustomInput = (props) => {
  const { type, label, i_class, name, value, onChange, onBlur } = props;
  return (
    <div className="form-floating mt-3">
      <input
        type={type}
        className={`form-control ${i_class}`}
        name={name}
        value={value}
        placeholder={label}
        onChange={onChange}
        onBlur={onBlur}
      />
      <label htmlFor={label}>{label}</label>
    </div>
  );
};
