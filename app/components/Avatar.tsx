"use client";
import { User } from "@prisma/client";
import Image from "next/image";
import React, { FC } from "react";
import useActiveList from "../hooks/useActiveList";

interface AvatarProps {
  user: User;
}

const Avatar: FC<AvatarProps> = ({ user }) => {
  const { members } = useActiveList();
  const isActive = members.indexOf(user?.email!) !== -1;
  return (
    <div className="relative">
      <div className="relative inline-block rounded-full overflow-hidden h-9 w-9 md:h-11 md:w-11">
        <Image
          src={user.image || "/images/placeholder.jpg"}
          alt="user avatar"
          fill
        />
      </div>
      {isActive && (
        <span className="absolute block rounded-full bg-success ring-2 ring-base-100 top-0 right-0 h-2 w-2 md:h-3 md:w-3" />
      )}
    </div>
  );
};

export default Avatar;
