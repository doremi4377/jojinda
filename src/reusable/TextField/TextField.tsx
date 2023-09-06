import React from "react";

import "./TextField.scss";

interface TextFieldProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    Record<string, string | unknown> {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function TextField({ onChange, ...restProps }: TextFieldProps) {
  return (
    <div className="text-field">
      <input type="text" onChange={onChange} {...restProps} />
    </div>
  );
}

export default TextField;
