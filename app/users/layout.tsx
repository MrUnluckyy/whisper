import { ReactNode } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import getUsers from "../actions/getUsers";
import UsersList from "./components/UsersList";
import { User } from "@prisma/client";

export default async function UsersLayout({
  children,
}: {
  children: ReactNode;
}) {
  const users = await getUsers();
  return (
    <Sidebar>
      <div className="h-full">
        <UsersList items={users} />
        {children}
      </div>
    </Sidebar>
  );
}
