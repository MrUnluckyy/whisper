import Image from "next/image";
import React, { FC } from "react";

interface ImageModalProps {
  image: string;
}

const ImageModal: FC<ImageModalProps> = ({ image }) => {
  return (
    <>
      <dialog id={image} className="modal">
        <div className="modal-box">
          <div className="w-80 h-80">
            <Image src={image} alt="" className="object-cover" fill />
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle absolute right-2 top-2">
                ✕
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ImageModal;
