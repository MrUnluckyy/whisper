"use client";
import Avatar from "@/app/components/Avatar";
import useOtherUser from "@/app/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import { format } from "date-fns";
import React, { FC, useMemo, useRef } from "react";
import { IoClose, IoTrash } from "react-icons/io5";
import ConfirmModal from "@/app/conversations/[conversationId]/components/ConfirmModal";
import AvatarGroup from "@/app/components/AvatarGroup";
import useActiveList from "@/app/hooks/useActiveList";

interface ProfileDrawerProps {
  data: Conversation & { users: User[] };
}

const ProfileDrawer: FC<ProfileDrawerProps> = ({ data }) => {
  const otherUser = useOtherUser(data);
  const { members } = useActiveList();
  const isActive = members.indexOf(otherUser.email!) !== -1;

  const joinedDate = useMemo(() => {
    return format(new Date(otherUser.createdAt), "PP");
  }, [otherUser.createdAt]);

  const title = useMemo(() => {
    return data.name || otherUser.name;
  }, [data.name, otherUser.name]);

  const statusText = useMemo(() => {
    if (data.isGroup) {
      return `${data.users.length} members`;
    }
    return isActive ? "Active" : "Offline";
  }, [data, isActive]);

  const infoTitle =
    "text-sm font-medium text-base-content opacity-40 sm:w-40 sm:flex-shrink-0";
  const infoBody = "mt-1 text-sm text-base-content sm:col-span-2";

  const modalRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <ConfirmModal id="profile-drawer" modalRef={modalRef} />
      <div className="drawer-side z-50">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        />
        <div className="menu flex flex-col bg-base-200 text-base-content overflow-y-scroll py-6 px-4 shadow-xl h-full w-screen max-w-md">
          <div className="flex items-start justify-end">
            <div className="ml-3 flex h-7 items-center">
              <label
                htmlFor="my-drawer-4"
                aria-label="close sidebar"
                className="btn btn-neutral btn-sm"
              >
                <span className="sr-only">Close panel</span>
                <IoClose />
              </label>
            </div>
          </div>
          <div className="relative mt-6 flex-1">
            <div className="flex flex-col items-center">
              <div className="mb-2">
                {data.isGroup ? (
                  <AvatarGroup users={data.users} />
                ) : (
                  <Avatar user={otherUser} />
                )}
              </div>
              <div>{title}</div>
              <div className="text-sm text-base-content opacity-40">
                {statusText}
              </div>
              <div className="flex gap-10 my-8">
                <div
                  onClick={() => {
                    modalRef.current?.showModal();
                  }}
                  className="flex flex-col gap-3 items-center cursor-pointer hover:opacity-75"
                >
                  <div className="w-10 h-10 bg-primary text-primary-content rounded-full flex items-center justify-center">
                    <IoTrash size={20} />
                  </div>
                  <div className="text-sm font-light text-base-content">
                    Delete
                  </div>
                </div>
              </div>
              <div className="w-full pb-5 pt-5 sm:px-0 sm:pt-0">
                <dl className="space-y-8 px-4 sm:space-y-6 sm:px-6">
                  {!data.isGroup && (
                    <div>
                      <dt className={infoTitle}>Email</dt>
                      <dd className={infoBody}>{otherUser.email}</dd>
                    </div>
                  )}
                  {data.isGroup && (
                    <div>
                      <dt className={infoTitle}>Emails</dt>
                      <dd className={infoBody}>
                        {data.users.map((user) => user.email).join(", ")}
                      </dd>
                    </div>
                  )}
                  {!data.isGroup && (
                    <>
                      <hr className="text-base-content opacity-15" />
                      <div>
                        <dt className={infoTitle}>Joined</dt>
                        <dd className={infoBody}>
                          <time dateTime={joinedDate}>{joinedDate}</time>
                        </dd>
                      </div>
                    </>
                  )}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileDrawer;
