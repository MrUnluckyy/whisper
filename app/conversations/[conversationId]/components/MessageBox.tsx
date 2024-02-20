"use client";

import Avatar from "@/app/components/Avatar";
import { FullMessageType } from "@/app/types";
import { trimName } from "@/app/utils/trimName";
import clsx from "clsx";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { FC } from "react";
import ImageModal from "./ImageModal";
import { HiReply } from "react-icons/hi";
import MessageOptions from "./MessageOptions";

interface MessageBoxProps {
  data: FullMessageType;
  isLast?: boolean;
  onReply: (message: FullMessageType) => void;
}

const MessageBox: FC<MessageBoxProps> = ({ data, isLast, onReply }) => {
  const session = useSession();
  const isOwn = session.data?.user?.email === data?.sender?.email;
  const seenList = (data.seen || [])
    .filter((user) => user.email !== data?.sender?.email)
    .map((user) => trimName(user?.name!))
    .join(", ");

  const handleOpenModal = (image: string) => {
    if (!image) return;
    const modalId = document.getElementById(image) as HTMLDialogElement;
    modalId.showModal();
  };

  return (
    <>
      <div
        className={clsx(
          "chat p-4 gap-2 group/item",
          isOwn ? "chat-end" : "chat-start"
        )}
      >
        <Avatar user={data.sender} inChat />

        {data.image ? (
          <>
            <img
              src={data.image}
              alt=""
              className={clsx(
                "object-cover rounded-lg mt-2 w-[288] h-[288] cursor-pointer hover:scale-105 transition translate"
              )}
              onClick={() => handleOpenModal(data.image!)}
            />
            <ImageModal image={data.image} />
          </>
        ) : (
          <>
            <div
              className={clsx(
                "chat-bubble cursor-pointer hover:scale-[101%] transition translate min-w-[80px]",
                isOwn ? "chat-bubble-primary" : "chat-bubble-secondary"
              )}
              onClick={() => onReply(data)}
            >
              <p className="text-end">
                <time className="text-xs opacity-50">
                  {format(new Date(data.createdAt), "p")}
                </time>
              </p>

              {data.parent && (
                <p className="text-xs pb-1 truncate ... opacity-50">
                  <span>Replied to: </span>
                  {data.parent?.body}
                </p>
              )}
              <p>{data.body}</p>
            </div>
          </>
        )}

        <div className="chat-footer opacity-50">
          {isLast && isOwn && seenList.length > 0 && (
            <div className="text-xs font-light">{`Seen by ${seenList}`}</div>
          )}
        </div>
      </div>
    </>
  );
};

export default MessageBox;
