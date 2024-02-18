"use client";
import React, { FC, ReactNode } from "react";
import clsx from "clsx";

interface ButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  fullWidth?: boolean;
  children: ReactNode;
  secondary?: boolean;
  danger?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

const Button: FC<ButtonProps> = ({
  type,
  fullWidth,
  secondary,
  danger,
  disabled,
  children,
  onClick,
}) => {
  return (
    <button
      type={type}
      className={clsx(
        "btn",
        disabled && "btn-disabled",
        fullWidth && "w-full",
        secondary ? "text-gray-900 btn-secondary" : "text-white",
        danger && "btn-danger"
      )}
    >
      {children}
    </button>
  );
};

export default Button;
