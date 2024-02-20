"use client";
import { User } from "@prisma/client";
import React, { FC } from "react";
import UserBox from "./UserBox";

interface UsersListProps {
  items: User[];
}

const UsersList: FC<UsersListProps> = ({ items }) => {
  return (
    <aside className="fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto block w-full left-0 border-r border-base-300 bg-base-200 z-50">
      <div className="px-5">
        <div className="flex-col">
          <div className="text-2xl font-bold text-base-content py-4">Users</div>
        </div>
        {items.map((item) => (
          <UserBox key={item.id} data={item} />
        ))}
      </div>
    </aside>
  );
};

export default UsersList;
