"use client";
import useRoutes from "@/app/hooks/useRoutes";
import React, { FC, useRef, useState } from "react";
import DesktopItem from "./DesktopItem";
import { User } from "@prisma/client";
import Avatar from "../Avatar";
import SettingsModal from "./SettingsModal";
import ThemeModal from "./ThemeModal";

interface DesktopSidebarProps {
  currentUser: User;
}

const DesktopSidebar: FC<DesktopSidebarProps> = ({ currentUser }) => {
  const routes = useRoutes();
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 lg:overflow-y-auto lg:bg-neutral lg:border-r-[1px] border-accent-content lg:pb-4 lg:flex lg:flex-col justify-between items-center">
        <nav className="mt-4 flex flex-col justify-between">
          <ul role="list" className="flex flex-col items-center space-y-1">
            {routes.map((item) => (
              <DesktopItem
                key={item.label}
                href={item.href}
                label={item.label}
                icon={item.icon}
                active={item.active}
                onClick={item.onClick}
              />
            ))}
            <div className="divider text-base-300" />
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
