import React from "react";

const TextBoxLoader = () => {
  return (
    <div className="flex flex-col gap-4 w-52">
      <div className="flex gap-4 items-center">
        <div className="skeleton w-16 h-16 rounded-full shrink-0"></div>
        <div className="flex flex-col gap-4">
          <div className="skeleton h-4 w-40"></div>
        </div>
      </div>
    </div>
  );
};

export default TextBoxLoader;
