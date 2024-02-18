"use client";
import React, { useRef } from "react";
import Theme from "../Theme";
import { HiPaintBrush } from "react-icons/hi2";

const ThemeModal = () => {
  const themeModalRef = useRef<HTMLDialogElement>(null);
  return (
    <>
      <li>
        <button
          className="group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold text-neutral-content hover:text-base-content hover:bg-base-200"
          onClick={() => themeModalRef.current?.showModal()}
        >
          <HiPaintBrush />
          <span className="sr-only">Change theme</span>
        </button>
      </li>
      <dialog ref={themeModalRef} id="theme-modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Change theme</h3>
          <p>Choose one of the following themes:</p>
          <Theme />
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ThemeModal;
