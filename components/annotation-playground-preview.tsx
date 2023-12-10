"use client";

// annotation playground preview component that displays an image of the playground and a button to request access on home

import Link from "next/link";
import Image from "next/image";

const AnnotationPlayground = () => {
  return (
    <div className="flex w-full  max-w-[1000px] relative z-10  ">
      <Image
        src="/screenshot.png"
        width={2024}
        height={1274}
        className="aspect-[2/1.2] opacity-50 blur-[1px] dark:hidden"
        alt="playground preview"
      ></Image>
      <Image
        src="/screenshot-dark.png"
        width={2024}
        height={1274}
        className="aspect-[2/1.2] opacity-50 blur-[1px] dark:block hidden"
        alt="playground preview"
      ></Image>

      <div className="absolute top-0  w-full h-full flex items-center justify-center z-20">
        <div className="max-w-[200px] flex flex-col gap-2 items-center text-center bg-white dark:bg-zinc-100  dark:text-black px-6 py-8 rounded-md border shadow-sm">
          <p className="flex flex-col gap-2 font-medium">
            Playground is
            <br /> currrently in closed preview{" "}
          </p>
          <a
            href="mailto:parzerphilipp@gmail.com"
            className=" mt-5 block px-4 py-2 rounded-md border text-sm w-full"
          >
            request access
          </a>
          
            <p className="text-sm opacity-50">or</p>
         
          <Link
            href="/login"
            className="bg-black rounded-md px-4 py-2 text-white hover:bg-opacity-80 w-full"
          >
            login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AnnotationPlayground;
