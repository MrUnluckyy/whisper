"use client";
import clsx from "clsx";
import Link from "next/link";
import { FC, useMemo } from "react";
import { IconType } from "react-icons";

interface DesktopItemProps {
  label: string;
  icon: IconType;
  href: string;
  onClick?: () => void;
  active?: boolean;
  notifications?: string[];
}

const DesktopItem: FC<DesktopItemProps> = ({
  label,
  icon: Icon,
  href,
  onClick,
  active,
  notifications,
}) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  const showNotification = useMemo(() => {
    if (!notifications) return false;
    return (
      label === "Chat" && notifications?.length && notifications?.length > 0
    );
  }, [notifications, label]);

  return (
    <li onClick={handleClick}>
      <Link
        href={href}
        className={clsx(
          "group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold hover:text-base-content hover:bg-base-200 ",
          active && "bg-primary-content text-primary"
        )}
      >
        <div className="indicator">
          <Icon className="h-6 w-6 shrink-0" />
          <span className="sr-only">{label}</span>
          {showNotification ? (
            <span className="indicator-item badge badge-secondary badge-sm text-xs">
              {notifications?.length}
            </span>
          ) : null}
        </div>
      </Link>
    </li>
  );
};

export default DesktopItem;
