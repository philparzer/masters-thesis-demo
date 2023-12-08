import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} dark:bg-opacity-100 bg-opacity-50`}
    >
      <body className="flex flex-col items-center p-24 bg-slate-50 dark:text-zinc-300 dark:bg-zinc-950">
        <Toaster
          position="bottom-center"
          richColors
          closeButton
          duration={15000}
        />
        {children}
      </body>
    </html>
  );
}
