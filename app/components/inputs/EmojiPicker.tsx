"use client";
import data, { Emoji, Skin } from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { FC, useState } from "react";
import { HiEmojiHappy } from "react-icons/hi";

interface EmojiPickerProps {
  onEmojiSelect: (emoji: Emoji & Skin) => void;
}

const EmojiPicker: FC<EmojiPickerProps> = ({ onEmojiSelect }) => {
  return (
    <div className="dropdown dropdown-top dropdown-end">
      <div tabIndex={0} role="button">
        <HiEmojiHappy size={30} />
      </div>
      <div tabIndex={0} className="dropdown-content z-[60] menu">
        <Picker data={data} onEmojiSelect={onEmojiSelect} theme={"auto"} />
      </div>
    </div>
  );
};

export default EmojiPicker;
