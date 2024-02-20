"use client";
import Input from "@/app/components/inputs/Input";
import Select from "@/app/components/inputs/Select";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { FC, useRef, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { MdOutlineGroupAdd } from "react-icons/md";

interface CreateGroupModalProps {
  users: User[];
}

const CreateGroupModal: FC<CreateGroupModalProps> = ({ users }) => {
  const [isLoading, setIsLoading] = useState(false);
  const createGroupModalRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      members: [],
    },
  });

  const members = watch("members");
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/conversations", {
        ...data,
        isGroup: true,
      })
      .then(() => {
        router.refresh();
        createGroupModalRef.current?.click();
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <label
        htmlFor="create-group-modal"
        className="rounded-full p-2 bg-primary text-primary-content cursor-pointer hover:opacity-75 transition"
      >
        <MdOutlineGroupAdd size={20} />
      </label>

      <input
        type="checkbox"
        ref={createGroupModalRef}
        id="create-group-modal"
        className="modal-toggle"
      />
      <div className="modal " role="dialog">
        <div className="modal-box overflow-visible">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-12">
              <div className="border-b border-base-content pb-12">
                <h2 className="text-base font-semibold leading-7">
                  Create a group chat
                </h2>
                <p className=" mt-1 text-sm leading-6 opacity-70">
                  Create a chat with more than 2 people.
                </p>
                <div className="mt-10 flex flex-col gap-y-8">
                  <Input
                    id="name"
                    label="Name"
                    register={register}
                    disabled={isLoading}
                    errors={errors}
                  />
                  <Select
                    disabled={isLoading}
                    label="Members"
                    options={users.map((user) => ({
                      value: user.id,
                      label: user.name,
                    }))}
                    onChange={(value) =>
                      setValue("members", value, {
                        shouldValidate: true,
                      })
                    }
                    value={members}
                  />
                </div>
              </div>
              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                  type="button"
                  className="btn"
                  onClick={() => createGroupModalRef.current?.click()}
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isLoading}
                >
                  Create
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateGroupModal;
