"use client";

import useConversation from "@/app/hooks/useConversation";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import MessageInput from "./MessageInput";
import { CldUploadButton } from "next-cloudinary";
import EmojiPicker from "@/app/components/inputs/EmojiPicker";
import { Emoji, Skin } from "@emoji-mart/data";
import { FullMessageType } from "@/app/types";
import { FC } from "react";
import { HiX } from "react-icons/hi";
import GiphyBox from "./GiphyBox";

interface FormProps {
  repliedTo?: FullMessageType | null;
  onReplyReset: () => void;
}

const Form: FC<FormProps> = ({ repliedTo, onReplyReset }) => {
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
    axios
      .post("/api/messages", {
        ...data,
        conversationId,
        parentId: repliedTo?.id,
      })
      .finally(() => {
        onReplyReset();
      });
  };

  const handleUpload = (result: any) => {
    axios.post("/api/messages", {
      image: result?.info?.secure_url,
      conversationId,
    });
  };

  const handleUploadGif = (gif: string) => {
    axios.post("/api/messages", {
      image: gif,
      conversationId,
    });
  };

  const handleAddEmoji = (emoji: Emoji & Skin) => {
    const message = getValues("message");
    setValue("message", message.concat(" ", emoji.native));
  };

  return (
    <div className="w-full border-t border-base-300">
      {repliedTo && (
        <div className="px-4 pt-4 text-sm flex justify-between">
          <div className="">
            <h3 className="font-bold">Replying to:</h3>
            <p className="font-light text-xs truncate ...">{repliedTo.body}</p>
          </div>
          <button className="p-2" onClick={onReplyReset}>
            <HiX size={18} />
          </button>
        </div>
      )}
      <div className="pt-2 pb-4 px-4 flex items-center gap-2 lg:gap-4">
        <CldUploadButton
          options={{ maxFiles: 1 }}
          onUpload={handleUpload}
          uploadPreset="ffzappy2"
        >
          <HiPhoto size={30} />
        </CldUploadButton>
        <EmojiPicker onEmojiSelect={handleAddEmoji} />
        <GiphyBox onSelected={(gif) => handleUploadGif(gif)} />

        <form
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
        </form>
      </div>
    </div>
  );
};

export default Form;
