"use client";
import React, { useEffect } from "react";
import { themeChange } from "theme-change";

function Theme() {
  useEffect(() => {
    themeChange(false);
  }, []);

  const themes = ["light", "dark", "retro", "night", "coffee", "cmyk"];
  return (
    <div className="p-4">
      <div className="join join-horizontal">
        {themes.map((theme) => (
          <input
            key={theme}
            type="radio"
            name="theme-buttons"
            className="btn theme-controller join-item capitalize"
            aria-label={theme}
            value={theme}
          />
        ))}
      </div>
    </div>
  );
}

export default Theme;
