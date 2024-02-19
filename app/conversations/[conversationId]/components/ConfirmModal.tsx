"use client";
import { useRouter } from "next/navigation";
import React, { FC, RefObject, useCallback, useRef, useState } from "react";
import useConversation from "../../../hooks/useConversation";
import axios from "axios";
import toast from "react-hot-toast";
import { FiAlertTriangle } from "react-icons/fi";

interface ConfirmModalProps {
  id: string;
  modalRef: RefObject<HTMLDialogElement>;
}

const ConfirmModal: FC<ConfirmModalProps> = ({ id, modalRef }) => {
  const router = useRouter();
  const { conversationId } = useConversation();
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = useCallback(() => {
    setIsLoading(true);

    axios
      .delete(`/api/conversations/${conversationId}`)
      .then(() => {
        modalRef.current?.close();
        router.push("/conversations");
        router.refresh();
      })
      .catch((err) => {
        toast.error("Somthing went wrong!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [conversationId, router, modalRef]);

  return (
    <dialog id={id} ref={modalRef} className="modal">
      <div className="modal-box max-w-md">
        <div className="flex flex-col justify-center text-center spacing-y-6">
          <div className="flex justify-center mb-4">
            <FiAlertTriangle className="h-10 w-10 text-error opacity-60" />
          </div>
          <h3 className="font-semibold leading-6 text-base-content">
            Delete conversation
          </h3>
          <div className="mt-2">
            <p className="text-sm text-base-content opacity-80">
              Are you sure you want to delete this conversation? This action can
              not be undone.
            </p>
          </div>

          <div className="modal-action">
            <button
              className="btn btn-error"
              disabled={isLoading}
              onClick={onDelete}
            >
              {!isLoading ? (
                "Confirm"
              ) : (
                <span className="loading loading-spinner" />
              )}
            </button>
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Cancel</button>
            </form>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default ConfirmModal;
