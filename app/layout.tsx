import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Toaster } from "sonner";
import { Analytics } from '@vercel/analytics/react';
import "./globals.css";

export const metadata: Metadata = {
  title: "LLM-based Text Analysis for Translation of Literary Texts",
  description: "Master's Thesis by Philipp Parzer | Translation Studies at the University of Innsbruck",
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
      <body className="flex flex-col items-center p-4 pt-24 lg:p-24 bg-slate-50 dark:text-zinc-300 dark:bg-zinc-950">
        <div className="fixed z-50  bottom-0 lg:right-auto right-4 lg:left-4 p-1 pb-0.5 px-2 bg-red-600 text-[10px] lg:text-xs text-white">
          under construction
        </div>
        <Toaster
          position="bottom-center"
          richColors
          closeButton
          duration={5000}
        />
        {children}
        <div className="fixed top-4 right-4 ">
          <a className="flex items-center gap-2 bg-white dark:bg-zinc-950 border rounded-md px-4 py-2 text-sm" href="https://github.com/philparzer/masters-thesis-demo" rel="noopener noreferrer" target="_blank">
            open-source{" "}
            <svg
              width="20"
              viewBox="0 0 98 96"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="fill-black dark:fill-white"
            >
              <g clip-path="url(#clip0_308_2)">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M48.854 0C21.839 0 0 22 0 49.217C0 70.973 13.993 89.389 33.405 95.907C35.832 96.397 36.721 94.848 36.721 93.545C36.721 92.404 36.641 88.493 36.641 84.418C23.051 87.352 20.221 78.551 20.221 78.551C18.037 72.847 14.801 71.381 14.801 71.381C10.353 68.366 15.125 68.366 15.125 68.366C20.059 68.692 22.648 73.418 22.648 73.418C27.015 80.914 34.052 78.796 36.883 77.492C37.287 74.314 38.582 72.114 39.957 70.892C29.118 69.751 17.714 65.514 17.714 46.609C17.714 41.231 19.654 36.831 22.728 33.409C22.243 32.187 20.544 27.134 23.214 20.371C23.214 20.371 27.339 19.067 36.64 25.423C40.6221 24.3457 44.7288 23.7976 48.854 23.793C52.979 23.793 57.184 24.364 61.067 25.423C70.369 19.067 74.494 20.371 74.494 20.371C77.164 27.134 75.464 32.187 74.979 33.409C78.134 36.831 79.994 41.231 79.994 46.609C79.994 65.514 68.59 69.669 57.67 70.892C59.45 72.44 60.986 75.373 60.986 80.018C60.986 86.618 60.906 91.915 60.906 93.544C60.906 94.848 61.796 96.397 64.222 95.908C83.634 89.388 97.627 70.973 97.627 49.217C97.707 22 75.788 0 48.854 0Z"
                />
              </g>
              <defs>
                <clipPath id="clip0_308_2">
                  <rect width="98" height="96" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </a>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
