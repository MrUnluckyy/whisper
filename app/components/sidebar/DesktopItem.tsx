"use client";
import clsx from "clsx";
import Link from "next/link";
import { FC } from "react";
import { IconType } from "react-icons";

interface DesktopItemProps {
  label: string;
  icon: IconType;
  href: string;
  onClick?: () => void;
  active?: boolean;
}

const DesktopItem: FC<DesktopItemProps> = ({
  label,
  icon: Icon,
  href,
  onClick,
  active,
}) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };
  return (
    <li onClick={handleClick}>
      <Link
        href={href}
        className={clsx(
          "group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold text-neutral-content hover:text-base-content hover:bg-base-200",
          active && "bg-base-300 text-base-content"
        )}
      >
        <Icon className="h-6 w-6 shrink-0" />
        <span className="sr-only">{label}</span>
      </Link>
    </li>
  );
};

export default DesktopItem;
