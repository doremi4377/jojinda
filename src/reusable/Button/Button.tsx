import React from "react";
import classNames from "classnames";

import "./Button.scss";

interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  size?: "full" | "large" | "small";
  theme?: "primary" | "grey";
  type?: "button" | "submit" | "reset";
}

function Button({ children, className, disabled = false, size = "full", theme = "primary", type = "button", ...restProps }: ButtonProps) {
  return (
    <div className={classNames("button", { disabled }, size, theme, className)}>
      <button disabled={disabled} type={type} {...restProps}>
        {children}
      </button>
    </div>
  );
}

export default Button;
