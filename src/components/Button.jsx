import React from "react";

const Button = ({ className, children }) => {
  return <button className={`btn ${className}`}>{children}</button>;
};

export default Button;
