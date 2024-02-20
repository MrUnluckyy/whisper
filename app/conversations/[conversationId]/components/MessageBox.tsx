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
          "chat px-4 gap-2 group/item",
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
                "object-fit rounded-lg mt-2 w-[200px] h-[200px] cursor-pointer hover:scale-105 transition translate"
              )}
              onClick={() => handleOpenModal(data.image!)}
            />
            <ImageModal image={data.image} />
          </>
        ) : (
          <>
            <div
              className={clsx(
                "chat-bubble cursor-pointer hover:scale-[101%] transition translate min-w-[100px] p-1",
                isOwn ? "chat-bubble-primary" : "chat-bubble-secondary"
              )}
              onClick={() => onReply(data)}
            >
              {data.parent && (
                <div className="w-full bg-primary-content/20 px-2 py-1 rounded-box  border-l-4 border-secondary">
                  <h4 className="text-sm">
                    {data.parent?.senderId === data.senderId
                      ? `You`
                      : data.parent.sender.name}
                  </h4>
                  <p className="text-xs pb-1 truncate ... opacity-50">
                    {data.parent?.body}
                  </p>
                </div>
              )}
              <div className="px-2">
                <p>{data.body}</p>
                <time className="text-xs opacity-50">
                  {format(new Date(data.createdAt), "p")}
                </time>
              </div>
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
