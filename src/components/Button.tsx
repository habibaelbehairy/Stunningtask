import React from "react";
import { ButtonProps } from "../types/ButtonContent";

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  className = "",
}) => {
  return (
    <button
      className={`${
        variant === "primary" ? "btn-primary" : "btn-secondary"
      } ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
