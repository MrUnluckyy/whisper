"use client";
import React, { FC } from "react";
import { IconType } from "react-icons";

interface AuthSocialBUttonProps {
  icon: IconType;
  onClick: () => void;
}

const AuthSocialButton: FC<AuthSocialBUttonProps> = ({
  icon: Icon,
  onClick,
}) => {
  return (
    <button type="button" onClick={onClick} className="btn btn-primary flex-1">
      <Icon />
    </button>
  );
};

export default AuthSocialButton;
