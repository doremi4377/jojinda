import React from "react";
import classNames from "classnames";

import "./Form.scss";

interface FormItemProps {
  children?: React.ReactNode;
  label?: string;
}

interface FormProps {
  children?: React.ReactNode;
  className?: string;
}

function FormItem({ children, label }: FormItemProps) {
  return (
    <div className="form-item">
      <label>{label}</label>
      <div className="form-item-content">{children}</div>
    </div>
  );
}

function Form({ children, className }: FormProps) {
  return <div className={classNames("form", className)}>{children}</div>;
}

export default Form;

Form.Item = FormItem;
