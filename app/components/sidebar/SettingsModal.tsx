"use client";
import { User } from "@prisma/client";
import React, { FC, RefObject, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import Input from "../inputs/Input";
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";

interface SettingsModalProps {
  currentUser: User;
  modalRef: RefObject<HTMLDialogElement>;
  id: string;
}

const SettingsModal: FC<SettingsModalProps> = ({ currentUser }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser.name || "",
      image: currentUser.image || "",
    },
  });

  const settingRef = useRef<HTMLInputElement>(null);
  const image = watch("image");

  const handleUpload = (result: any) => {
    setValue("image", result?.info?.secure_url, {
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/settings", data)
      .then((data) => {
        router.refresh();
        settingRef.current?.click();
        toast.success("Your profile has been updated successfully");
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
      <input
        ref={settingRef}
        type="checkbox"
        id="settings-modal"
        className="modal-toggle"
      />
      <div className="modal" role="dialog">
        <div className="modal-box max-w-md">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="spave-y-12">
              <div className="border-b border-base-content/50 pb-12">
                <h2 className="text-base font-semibold leading-7 text-base-content">
                  Profile
                </h2>
                <p className="mt-1 text-sm leading-6 opacity-75">
                  Edit your public information
                </p>
                <div className="mt-10 flex flex-col gap-y-8">
                  <Input
                    id="name"
                    label="Name"
                    required
                    errors={errors}
                    register={register}
                    disabled={isLoading}
                  />
                  <div>
                    <label
                      htmlFor=""
                      className="block text-sm font-medium leading-6 text-base-content"
                    >
                      Photo
                    </label>
                    <div className="mt-2 flex items-center gap-x-3 z-40">
                      <Image
                        src={
                          image ||
                          currentUser?.image ||
                          "/images/placeholder.jpg"
                        }
                        alt="Avatar"
                        width={48}
                        height={48}
                        className="rounded-full object-cover w-[48px] h-[48px]"
                      />
                      <CldUploadButton
                        options={{ maxFiles: 1 }}
                        onUpload={handleUpload}
                        uploadPreset="ffzappy2"
                      >
                        Change
                      </CldUploadButton>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-end gap-x-6">
                <label htmlFor="settings-modal" className="btn">
                  Cancel
                </label>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isLoading}
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SettingsModal;
