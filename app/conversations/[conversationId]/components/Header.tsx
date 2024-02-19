"use client";
import Avatar from "@/app/components/Avatar";
import useOtherUser from "@/app/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import Link from "next/link";
import React, { FC, useMemo, useRef, useState } from "react";
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2";
import ProfileDrawer from "./ProfileDrawer";
import AvatarGroup from "@/app/components/AvatarGroup";
import useActiveList from "@/app/hooks/useActiveList";

interface HeaderProps {
  conversation: Conversation & { users: User[] };
}

const Header: FC<HeaderProps> = ({ conversation }) => {
  const { members } = useActiveList();
  const otherUser = useOtherUser(conversation);

  const isActive = members.indexOf(otherUser.email!) !== -1;

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }

    return isActive ? "Active" : "Offline";
  }, [conversation, isActive]);

  const drawerRef = useRef<HTMLInputElement>(null);

  return (
    <div className="drawer drawer-end">
      <input
        ref={drawerRef}
        id="my-drawer-4"
        type="checkbox"
        className="drawer-toggle"
      />
      <ProfileDrawer data={conversation} />
      <div className="w-full flex sm:px-4 py-3 px-4 lg:px-6 justify-between items-center border-b border-base-300">
        <div className="flex gap-3 items-center">
          <Link
            href={"/conversations"}
            className=" lg:hidden block transition cursor-pointer"
          >
            <HiChevronLeft size={32} />
          </Link>
          {conversation.isGroup ? (
            <AvatarGroup users={conversation.users} />
          ) : (
            <Avatar user={otherUser} />
          )}
          <div className="flex flex-col">
            <div>{conversation.name || otherUser.name}</div>
            <div className="text-sm font-light">{statusText}</div>
          </div>
        </div>

        <label htmlFor="my-drawer-4">
          <HiEllipsisHorizontal
            size={32}
            className="cursor-pointer transition"
          />
        </label>
      </div>
    </div>
  );
};

export default Header;
