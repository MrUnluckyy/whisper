"use client";
import React, { useEffect, useRef } from "react";
import { ClipLoader } from "react-spinners";

const LoadingModal = () => {
  return (
    <>
      <dialog id="my_modal_1" className="modal bg-base-100/60" open>
        <span className="loading loading-spinner loading-lg"></span>
      </dialog>
    </>
  );
};

export default LoadingModal;
