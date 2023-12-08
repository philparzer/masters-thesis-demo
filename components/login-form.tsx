"use client";

import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "@/components/actions";

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <form action={dispatch} className="">
      <div className="flex-1 rounded-lg border w-[400px] px-6 pb-4 pt-8 text-black bg-white shadow-sm">
        <h1 className={`   font-base text-lg mb-8 mt-2`}>
          <span className="block font-semibold opacity-100  text-xl">
            Playground Preview
          </span>
        </h1>

        <div className="w-full">
          <div>
            <label
              className="mb-1 opacity-50 px-1 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              username
            </label>
            <div className="relative">
              <input
                className="peer focus:outline-black block w-full rounded-md border border-gray-200 py-[9px] px-2 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                name="email"
                placeholder="preview account username"
                required
              />
              {/* <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-1 opacity-50 px-1 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              password
            </label>
            <div className="relative">
              <input
                className="peer focus:outline-black block w-full rounded-md border border-gray-200 py-[9px] px-2 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="preview account password"
                required
                minLength={6}
              />
              {/* <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
            </div>
          </div>
        </div>
        <div className="flex gap-2 items-center mt-10">
          <LoginButton />
          <p className="px-2 opacity-50 text-sm">or</p>
          <a
            href="mailto:parzerphilipp@gmail.com"
            className="block px-4  py-2 rounded-md border text-sm"
          >
            request access
          </a>
        </div>
        <div></div>
        <div
          className="flex mt-2 h-6 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              {/* <ExclamationCircleIcon className="h-5 w-5 text-red-500" /> */}
              <p className="text-sm px-1 text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="block rounded-md px-4 hover:opacity-80 focus:outline-red-500     bg-black py-2 text-white text-sm"
      aria-disabled={pending}
    >
      log in
    </button>
  );
}
