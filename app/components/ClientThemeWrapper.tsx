"use client";
import { ReactNode, useContext } from "react";
import { ThemeContext } from "./ThemeContext";

export default function ClientThemeWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const { theme } = useContext(ThemeContext);
  return <div data-theme={theme}>{children}</div>;
}
