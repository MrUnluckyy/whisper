"use client";

import Avatar from "@/app/components/Avatar";
import { FullMessageType } from "@/app/types";
import { trimName } from "@/app/utils/trimName";
import { Message } from "@prisma/client";
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
  const isOwn = session.data?.user?.email === data.sender.email;
  const seenList = (data.seen || [])
    .filter((user) => user.email !== data.sender.email)
    .map((user) => trimName(user?.name!))
    .join(", ");

  const container = clsx("flex gap-3 p-4", isOwn && "justify-end");
  const avatar = clsx(isOwn && "order-2");
  const body = clsx("flex flex-col gap-2", isOwn && "items-end");
  const message = clsx(
    "text-sm w-fit overflow-hidden text-[black]",
    isOwn ? "bg-primary" : "bg-base-300",
    data.image ? "rounded-md p-0" : "rounded-full py-2 px-3"
  );

  const handleOpenModal = (image: string) => {
    if (!image) return;
    const modalId = document.getElementById(image) as HTMLDialogElement;
    modalId.showModal();
  };

  return (
    <>
      <div className={container}>
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
      </div>
    </>
  );
};

export default MessageBox;