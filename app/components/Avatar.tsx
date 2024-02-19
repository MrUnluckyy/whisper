"use client";
import { User } from "@prisma/client";
import Image from "next/image";
import React, { FC } from "react";
import useActiveList from "../hooks/useActiveList";
import clsx from "clsx";

interface AvatarProps {
  user: User;
  inChat?: boolean;
}

const Avatar: FC<AvatarProps> = ({ user, inChat }) => {
  const { members } = useActiveList();
  const isActive = members.indexOf(user?.email!) !== -1;
  return (
    <>
      <div
        className={clsx(
          "avatar ",
          isActive && !inChat && "online",
          !user?.image && "placeholder",
          inChat && "chat-image"
        )}
      >
        <div className="w-11 rounded-full relative bg-neutral text-neutral-content">
          {user?.image ? (
            <Image
              src={user?.image || "/images/placeholder.jpg"}
              alt="user avatar"
              className="object-cover"
              fill
            />
          ) : (
            <span>{user.name?.charAt(0)}</span>
          )}
        </div>
      </div>
    </>
  );
};

export default Avatar;
