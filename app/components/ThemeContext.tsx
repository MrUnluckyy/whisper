"use client";
import { ChangeEvent, createContext, useEffect, useState } from "react";
import { ThemeType } from "@/app/types";

interface ThemeContextType {
  theme?: ThemeType;
  changeTheme?: (event: ChangeEvent<HTMLInputElement>) => void;
}
export const ThemeContext = createContext<ThemeContextType>({});

export const ThemeProvider = ({ children }: any) => {
  const [theme, setTheme] = useState<ThemeType>(
    () => (localStorage.getItem("theme") as ThemeType) || "lofi"
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const changeTheme = (event?: ChangeEvent<HTMLInputElement>) => {
    const nextTheme = (event?.target.value as ThemeType) || null;
    if (nextTheme) {
      setTheme(nextTheme);
    } else {
      setTheme((prev) => (prev === "lofi" ? "dim" : "lofi"));
    }
  };
  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
