"use client";
import React, { ChangeEvent, useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import { ThemeType } from "../types";

function Theme() {
  const { changeTheme, theme } = useContext(ThemeContext);

  const themes: ThemeType[] = [
    "lofi",
    "dim",
    "night",
    "coffee",
    "valentine",
    "cyberpunk",
  ];
  const handleThemeChagne = (event: ChangeEvent<HTMLInputElement>) => {
    if (changeTheme) {
      changeTheme(event);
    }
  };
  return (
    <div className="p-4">
      <div className="join join-horizontal">
        {themes.map((themeOption) => (
          <input
            onChange={handleThemeChagne}
            key={themeOption}
            type="radio"
            name="theme-buttons"
            className="btn btn-sm lg:btn-md theme-controller join-item capitalize"
            aria-label={themeOption}
            value={themeOption}
            checked={theme === themeOption}
          />
        ))}
      </div>
    </div>
  );
}

export default Theme;
