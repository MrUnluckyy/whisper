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
          isActive ? "online" : "offline",
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
      {/* <div className="avatar offline">
        <div className="w-24 rounded-full">
          <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      </div> */}
    </>
    // <div className="relative">
    //   <div className="relative inline-block rounded-full overflow-hidden h-9 w-9 md:h-11 md:w-11">
    // <Image
    //   src={user?.image || "/images/placeholder.jpg"}
    //   alt="user avatar"
    //   fill
    //   className="object-cover"
    // />
    //   </div>
    //   {isActive && (
    //     <span className="absolute block rounded-full bg-success ring-2 ring-base-100 top-0 right-0 h-2 w-2 md:h-3 md:w-3" />
    //   )}
    // </div>
  );
};

export default Avatar;
