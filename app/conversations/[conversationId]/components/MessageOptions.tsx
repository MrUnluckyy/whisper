import React, { FC } from "react";
import { HiReply } from "react-icons/hi";

interface MessageOptionsProps {
  onClick: () => void;
}

const MessageOptions: FC<MessageOptionsProps> = ({ onClick }) => {
  return (
    <div className="group/edit invisible opacity-0 group-hover/item:visible group-hover/item:opacity-100 cursor-pointer transition">
      <button className="btn btn-xs btn-circle" onClick={onClick}>
        <HiReply />
      </button>
    </div>
  );
};

export default MessageOptions;
