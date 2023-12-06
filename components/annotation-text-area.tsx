"use client";

import { analyzeText } from "@/components/actions";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import AnnotatedText from "./annotated-text";

interface AnnotationTextAreaProps {}

interface SubmitButtonInterface {
  content: string;
  setIsLoading: (isLoading: boolean) => void;
}

const SubmitButton = ({ content, setIsLoading }: SubmitButtonInterface) => {
  const { pending } = useFormStatus();
  useEffect(() => {
    setIsLoading(pending);
  }, [pending]);
  return (
    <button
      className={` ${
        content.length > 0 && !pending
          ? "group hover:bg-white hover:text-black"
          : !pending
          ? "opacity-10"
          : "bg-transparent text-black border-none"
      } left-0 top-0 flex  items-center gap-2 rounded-md text-white px-4 py-1 bg-black border pr-3 transition-colors  border-black`}
      disabled={content.length === 0 || pending}
      title={
        content.length === 0
          ? "Please enter some text in the text area below"
          : "Analyze text"
      }
      type="submit"
    >
      {pending ? (
        <span className=" flex items-center gap-2">
          <span className="opacity-50">analyzing</span>
          <span role="status" className="inline-block">
            <svg
              aria-hidden="true"
              className="w-[14px] h-[14px] text-slate-100 animate-spin  fill-black"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </span>
        </span>
      ) : (
        "analyze"
      )}
      {!pending ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="18"
          viewBox="0 -960 960 960"
          width="18"
          className="fill-white group-hover:fill-black transition-colors "
        >
          <path d="M450-420q38 0 64-26t26-64q0-38-26-64t-64-26q-38 0-64 26t-26 64q0 38 26 64t64 26Zm193 160L538-365q-20 13-42.5 19t-45.5 6q-71 0-120.5-49.5T280-510q0-71 49.5-120.5T450-680q71 0 120.5 49.5T620-510q0 23-6.5 45.5T594-422l106 106-57 56ZM200-120q-33 0-56.5-23.5T120-200v-160h80v160h160v80H200Zm400 0v-80h160v-160h80v160q0 33-23.5 56.5T760-120H600ZM120-600v-160q0-33 23.5-56.5T200-840h160v80H200v160h-80Zm640 0v-160H600v-80h160q33 0 56.5 23.5T840-760v160h-80Z" />
        </svg>
      ) : null}
    </button>
  );
};

const AnnotationTextArea = ({}: AnnotationTextAreaProps) => {
  const [textAreaFocused, setTextAreaFocused] = useState(false);
  const [content, setContent] = useState("");
  const [state, formAction] = useFormState(analyzeText, { message: "" });
  const [isLoading, setIsLoading] = useState(false);

  return (
    <form className="flex w-full max-w-[1000px] relative" action={formAction}>
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

        {state?.sections ? (
          <div
            className={`  w-full h-[80vh] max-h-[500px]  p-4 placeholder:font-medium`}
          >
            <AnnotatedText text={content} sections={state.sections || []} />
          </div>
        ) : (
          <textarea
            name="text"
            required
            onFocus={() => setTextAreaFocused(true)}
            onBlur={() => setTextAreaFocused(false)}
            className={`resize-none w-full h-[80vh] placeholder:font-mono max-h-[500px]  p-4 placeholder:font-medium placeholder:opacity-50 focus:placeholder:opacity-100 placeholder:text-black focus:outline-none placeholder:text-lg ${
              isLoading ? "animate-pulse" : ""
            }`}
            autoFocus
            placeholder="Paste a page"
            content={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        )}

        <div className="absolute flex w-full border-b left-0 justify-between top-0  p-4 h-14 text-sm z-0 items-center">
          <h2 className="opacity-50 py-1">Text Analysis Playground</h2>
          {/*submit button*/}

          <div className="text-base relative">
            <SubmitButton content={content} setIsLoading={setIsLoading} />
          </div>
        </div>
      </div>

      <div className="absolute h-40 w-full bg-black text-green-500 bottom-0 overflow-y-scroll translate-y-10 opacity-0 hover:opacity-100">
        <div className="mb-2">debug:</div>
      </div>
    </form>
  );
};

export default AnnotationTextArea;
