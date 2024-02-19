import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ToasterContext from "./context/ToasterContext";
import AuthContext from "./context/AuthContext";
import Theme from "./components/Theme";
import ActiveStatus from "./components/ActiveStatus";
import { ThemeProvider } from "./components/ThemeContext";
import ClientThemeWrapper from "./components/ClientThemeWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Whisper",
  description: "Chat with your friend without too much noise",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <ClientThemeWrapper>
            <AuthContext>
              <ToasterContext />
              <ActiveStatus />
              {children}
            </AuthContext>
          </ClientThemeWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
