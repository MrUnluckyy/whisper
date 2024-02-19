"use client";
import useRoutes from "@/app/hooks/useRoutes";
import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import DesktopItem from "./DesktopItem";
import { User } from "@prisma/client";
import Avatar from "../Avatar";
import SettingsModal from "./SettingsModal";
import ThemeModal from "./ThemeModal";
import { useSession } from "next-auth/react";
import { pusherClient } from "@/app/libs/pusher";
import { FullMessageType } from "@/app/types";
import useNotificationList from "@/app/hooks/useNotificationList";

interface DesktopSidebarProps {
  currentUser: User;
}

const DesktopSidebar: FC<DesktopSidebarProps> = ({ currentUser }) => {
  const routes = useRoutes();
  const { add, notifications } = useNotificationList();
  const session = useSession();
  const modalRef = useRef<HTMLDialogElement>(null);

  const pusherKey = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  useEffect(() => {
    if (!pusherKey) {
      return;
    }

    pusherClient.subscribe(pusherKey);

    const newHandler = (message: FullMessageType) => {
      add(message.id);
      const whistle = new Audio("/sounds/notification.wav");
      if (!document.hasFocus()) {
        whistle.play();
      }
      document.title = "New Message";
    };

    pusherClient.bind("notification:new", newHandler);

    return () => {
      pusherClient.unsubscribe(pusherKey);
      pusherClient.unbind("notification:new", newHandler);
    };
  }, [pusherKey, add]);

  return (
    <>
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 lg:overflow-y-auto lg:bg-base-300 lg:pb-4 lg:flex lg:flex-col justify-between items-center border-r border-base-300">
        <nav className="mt-4 flex flex-col justify-between">
          <ul role="list" className="flex flex-col items-center space-y-1">
            {routes.map((item) => (
              <DesktopItem
                notifications={notifications}
                key={item.label}
                href={item.href}
                label={item.label}
                icon={item.icon}
                active={item.active}
                onClick={item.onClick}
              />
            ))}
            <div className="divider" />
            <ThemeModal />
          </ul>
        </nav>
        <nav className="mt-4 flex flex-col justify-between item-center">
          <div className="cursor-pointer hover:opacity-75 transition">
            <label htmlFor="settings-modal">
              <Avatar user={currentUser} />
            </label>
          </div>
        </nav>
      </div>
      <SettingsModal
        currentUser={currentUser}
        modalRef={modalRef}
        id="settings-modal"
      />
    </>
  );
};

export default DesktopSidebar;
