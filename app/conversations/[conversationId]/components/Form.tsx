"use client";

import useConversation from "@/app/hooks/useConversation";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import MessageInput from "./MessageInput";
import { CldUploadButton } from "next-cloudinary";
import GiphyBox from "./GiphyBox";
import EmojiPicker from "@/app/components/inputs/EmojiPicker";
import { Emoji, EmojiMartData, Skin } from "@emoji-mart/data";
import { MutableRefObject, useRef } from "react";

const Form = () => {
  const { conversationId } = useConversation();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue("message", "", { shouldValidate: true });
    axios.post("/api/messages", {
      ...data,
      conversationId,
    });
  };

  const handleUpload = (result: any) => {
    axios.post("/api/messages", {
      image: result?.info?.secure_url,
      conversationId,
    });
  };

  const handleAddEmoji = (emoji: Emoji & Skin) => {
    const message = getValues("message");
    setValue("message", message.concat(" ", emoji.native));
  };

  const inputRef = useRef<HTMLFormElement>(null);

  const handleGiphySelect = (image: string) => {
    inputRef.current?.focus();
    axios.post("/api/messages", {
      image,
      conversationId,
    });
  };

  return (
    <div className="py-4 px-4 flex items-center gap-2 lg:gap-4 w-full border-t border-base-300">
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onUpload={handleUpload}
        uploadPreset="ffzappy2"
      >
        <HiPhoto size={30} />
      </CldUploadButton>
      <GiphyBox onSelected={handleGiphySelect} />
      <GiphyBox type="stickers" onSelected={handleGiphySelect} />
      <form
        ref={inputRef}
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        className="flex items-center gap-2 lg:gap-4 w-full"
      >
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          required
          placeholder="Write a message"
        />
        <button type="submit" className="btn btn-primary btn-circle btn-sm">
          <HiPaperAirplane size={18} />
        </button>
        <EmojiPicker onEmojiSelect={handleAddEmoji} />
      </form>
    </div>
  );
};

export default Form;
