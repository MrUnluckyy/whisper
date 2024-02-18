"use client";
import React, { FC, useRef } from "react";

interface ModalProps {
  id: string;
  modalRef: any;
}

const Modal: FC<ModalProps> = ({ id, modalRef }) => {
  // const modalRef = useRef<HTMLDialogElement>(null);
  return (
    <dialog id={id} ref={modalRef} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Hello!</h3>
        <p className="py-4">Press ESC key or click the button below to close</p>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
