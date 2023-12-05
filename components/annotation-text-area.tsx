"use client";

import { useState } from "react";

interface AnnotationTextAreaProps {}

const AnnotationTextArea = ({}: AnnotationTextAreaProps) => {
  const [textAreaFocused, setTextAreaFocused] = useState(false);
  const [content, setContent] = useState("");

  return (
    <form className="flex w-full max-w-[1000px] relative">
      <div className="relative w-full  rounded-xl border p-10 pt-20 pb-10 flex bg-white">
        {/*border svgs*/}
        <div className="absolute p-10 pt-20 pb-10 left-0 top-0 h-full w-full flex pointer-events-none justify-between cursor- z-10">
          <div
            className={`w-full relative ${
              textAreaFocused ? "opacity-100" : "opacity-50"
            }`}
          >
            <svg
              width="8"
              height="8"
              viewBox="0 0 72 71"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.874634"
                y="0.539673"
                width="70.2224"
                height="10.686"
                fill="black"
              />
              <rect
                x="11.5607"
                y="0.539673"
                width="70.2224"
                height="10.686"
                transform="rotate(90 11.5607 0.539673)"
                fill="black"
              />
            </svg>
            <svg
              className="right-0 absolute top-0 scale-x-[-1]"
              width="8"
              height="8"
              viewBox="0 0 72 71"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.874634"
                y="0.539673"
                width="70.2224"
                height="10.686"
                fill="black"
              />
              <rect
                x="11.5607"
                y="0.539673"
                width="70.2224"
                height="10.686"
                transform="rotate(90 11.5607 0.539673)"
                fill="black"
              />
            </svg>
            <svg
              className="bottom-0 absolute scale-y-[-1]"
              width="8"
              height="8"
              viewBox="0 0 72 71"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.874634"
                y="0.539673"
                width="70.2224"
                height="10.686"
                fill="black"
              />
              <rect
                x="11.5607"
                y="0.539673"
                width="70.2224"
                height="10.686"
                transform="rotate(90 11.5607 0.539673)"
                fill="black"
              />
            </svg>
            <svg
              className="bottom-0 right-0 absolute scale-y-[-1] scale-x-[-1]"
              width="8"
              height="8"
              viewBox="0 0 72 71"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.874634"
                y="0.539673"
                width="70.2224"
                height="10.686"
                fill="black"
              />
              <rect
                x="11.5607"
                y="0.539673"
                width="70.2224"
                height="10.686"
                transform="rotate(90 11.5607 0.539673)"
                fill="black"
              />
            </svg>
          </div>
        </div>

        <textarea
          onFocus={() => setTextAreaFocused(true)}
          onBlur={() => setTextAreaFocused(false)}
          className=" resize-none w-full h-[80vh] placeholder:font-mono max-h-[500px]  p-4  shadow-sm placeholder:font-medium opacity-50 focus:opacity-100 placeholder:text-black focus:outline-none placeholder:text-lg"
          autoFocus
          placeholder="Paste a page"
          onChange={(e) => setContent(e.target.value)}
          content={content}
        ></textarea>

        <div className="absolute flex w-full border-b left-0 justify-between top-0  p-4 h-14 text-sm z-0 items-center">
          <h2 className="opacity-50 py-1">Text Analysis Playground</h2>
          {/*submit button*/}

          <div className="text-base relative">
            <button
              className={` ${
                content.length > 0
                  ? "group hover:bg-white hover:text-black"
                  : "opacity-10"
              } left-0 top-0 flex  items-center gap-2 rounded-md text-white px-4 py-1 bg-black border pr-3 transition-colors  border-black`}
              disabled={content.length === 0}
              title={content.length === 0 ? "Please enter some text in the text area below" : "Analyze text"}
              type="submit"
            >
              analyze text
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="18"
                viewBox="0 -960 960 960"
                width="18"
                className="fill-white group-hover:fill-black transition-colors "
              >
                <path d="M450-420q38 0 64-26t26-64q0-38-26-64t-64-26q-38 0-64 26t-26 64q0 38 26 64t64 26Zm193 160L538-365q-20 13-42.5 19t-45.5 6q-71 0-120.5-49.5T280-510q0-71 49.5-120.5T450-680q71 0 120.5 49.5T620-510q0 23-6.5 45.5T594-422l106 106-57 56ZM200-120q-33 0-56.5-23.5T120-200v-160h80v160h160v80H200Zm400 0v-80h160v-160h80v160q0 33-23.5 56.5T760-120H600ZM120-600v-160q0-33 23.5-56.5T200-840h160v80H200v160h-80Zm640 0v-160H600v-80h160q33 0 56.5 23.5T840-760v160h-80Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AnnotationTextArea;
