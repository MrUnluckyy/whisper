"use client";
import React, { FC } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface MessageInputProps {
  id: string;
  errors: FieldErrors;
  register: UseFormRegister<FieldValues>;
  required?: boolean;
  placeholder?: string;
  type?: string;
}

const MessageInput: FC<MessageInputProps> = ({
  id,
  errors,
  register,
  required,
  placeholder,
  type,
}) => {
  return (
    <div className="relative w-full">
      <input
        id={id}
        type={type}
        autoComplete={id}
        {...register(id, { required })}
        placeholder={placeholder}
        className="font-light py-2 px-4 w-full rounded-full focus:outline-none"
      />
    </div>
  );
};

export default MessageInput;
