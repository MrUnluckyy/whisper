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

interface MessageBoxProps {
  data: FullMessageType;
  isLast?: boolean;
}

const MessageBox: FC<MessageBoxProps> = ({ data, isLast }) => {
  const session = useSession();
  const isOwn = session.data?.user?.email === data?.sender?.email;
  const seenList = (data.seen || [])
    .filter((user) => user.email !== data?.sender?.email)
    .map((user) => trimName(user?.name!))
    .join(", ");

  const handleOpenModal = (image: string) => {
    if (!image || isGif) return;
    const modalId = document.getElementById(image) as HTMLDialogElement;
    modalId.showModal();
  };

  const isGif = data.image && data.image.indexOf("giphy.com") > 0;
  return (
    <>
      <div
        className={clsx("chat p-4 gap-2", isOwn ? "chat-end" : "chat-start")}
      >
        <Avatar user={data.sender} inChat />
        <div className="chat-header">
          <div className="flex gap-2 items-center">
            <p>{data.sender.name}</p>
            <time className="text-xs opacity-50">
              {format(new Date(data.createdAt), "p")}
            </time>
          </div>
        </div>

        {data.image ? (
          <>
            <img
              src={data.image}
              alt=""
              className={clsx(
                "object-cover rounded-lg mt-2 w-[288] h-[288]",
                !isGif && "cursor-pointer hover:scale-105 transition translate"
              )}
              onClick={() => handleOpenModal(data.image!)}
            />
            <ImageModal image={data.image} />
          </>
        ) : (
          <div
            className={clsx(
              "chat-bubble",
              isOwn ? "chat-bubble-primary" : "chat-bubble-secondary"
            )}
          >
            {data.body}
          </div>
        )}

        <div className="chat-footer opacity-50">
          {isLast && isOwn && seenList.length > 0 && (
            <div className="text-xs font-light">{`Seen by ${seenList}`}</div>
          )}
        </div>
      </div>
      {/* <div className={container}>
        <div className={avatar}>
          <Avatar user={data.sender} />
        </div>
        <div className={body}>
          <div className="flex items-center gap-1">
            <div className="text-sm">{data.sender.name}</div>
            <div className="text-xs text-neutral-content">
              {format(new Date(data.createdAt), "p")}
            </div>
          </div>
          <div className={message}>
            {data.image ? (
              <>
                <Image
                  src={data.image}
                  alt=""
                  height="288"
                  width="288"
                  className="object-cover cursor-pointer hover:scale-110 transition translate"
                  onClick={() => handleOpenModal(data.image!)}
                />
                <ImageModal image={data.image} />
              </>
            ) : (
              <div>{data.body}</div>
            )}
          </div>
          {isLast && isOwn && seenList.length > 0 && (
            <div className="text-xs font-light">{`Seen by ${seenList}`}</div>
          )}
        </div>
      </div> */}
    </>
  );
};

export default MessageBox;
