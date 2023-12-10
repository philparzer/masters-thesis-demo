"use client";

import { useEffect, useRef, useState } from "react";
import AnnotatedText from "./annotated-text";
import { modelSchema, models } from "@/lib/types";
import {
  defaultFunctionCallDescription,
  defaultSystemPrompt,
  defaultTemperature,
} from "@/lib/api-data";
import { toast } from "sonner"; //TODO: use sonner instead of error state
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SubmitButtonInterface {
  content: string;
  pending: boolean;
  getCompletion: () => void;
}

const maxCharCount = 1800;

const SubmitButton = ({ content, pending, getCompletion }: SubmitButtonInterface) => {
  return (
    <div className="flex gap-4 items-center">
      {content.length > maxCharCount ? (
        <div className=" text-red-600 text-sm">
          too many characters; {content.length} {">"} {maxCharCount}
        </div>
      ) : null}

      <button
        className={` ${
          content.length > 0 && content.length <= maxCharCount && !pending
            ? "group hover:bg-opacity-80  focus:outline-red-500"
            : !pending
            ? "opacity-10"
            : "bg-transparent text-black dark:text-white dark:border-white"
        } left-0 top-0 flex  items-center gap-2 rounded-md text-white dark:bg-white dark:text-black px-4 py-1 bg-black border pr-3 transition-colors  border-black`}
        disabled={content.length === 0 || pending}
        title={
          content.length === 0
            ? "Please enter some text in the text area below"
            : content.length > maxCharCount
            ? `you are currently at ${content.length}, 18 000 characters is the limit `
            : "Analyze text"
        }
        onClick={getCompletion}
      >
        {pending ? (
          <span className=" flex items-center gap-2 text-black">
            <span className="opacity-50">analyzing</span>
            <span role="status" className="inline-block">
              <svg
                aria-hidden="true"
                className="w-[14px] h-[14px] text-zinc-100 animate-spin  fill-black"
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
            className="fill-white dark:fill-black group-hover:opacity-80 transition-colors "
          >
            <path d="M450-420q38 0 64-26t26-64q0-38-26-64t-64-26q-38 0-64 26t-26 64q0 38 26 64t64 26Zm193 160L538-365q-20 13-42.5 19t-45.5 6q-71 0-120.5-49.5T280-510q0-71 49.5-120.5T450-680q71 0 120.5 49.5T620-510q0 23-6.5 45.5T594-422l106 106-57 56ZM200-120q-33 0-56.5-23.5T120-200v-160h80v160h160v80H200Zm400 0v-80h160v-160h80v160q0 33-23.5 56.5T760-120H600ZM120-600v-160q0-33 23.5-56.5T200-840h160v80H200v160h-80Zm640 0v-160H600v-80h160q33 0 56.5 23.5T840-760v160h-80Z" />
          </svg>
        ) : null}
      </button>
    </div>
  );
};

const AnnotationPlayground = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [textAreaFocused, setTextAreaFocused] = useState(false);
  const [content, setContent] = useState("");
  const executionIdRef = useRef(null);
  const pollingIntervalRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [jsonToSave, setJSONtoSave] = useState<string | null>(null);
  const [error, setError] = useState<any>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [completionState, setCompletionState] =
    useState<{ phrase: string; description: string }[]>();
  const [model, setModel] = useState<models>(
    modelSchema.safeParse(searchParams.get("model")).success
      ? (searchParams.get("model") as models)
      : "gpt-4-0613"
  );

  const updateSearchQuery = (updatedQuery: { [key: string]: string }) => {
    const params = new URLSearchParams(searchParams);
    Object.keys(updatedQuery).forEach((key) => {
      if (updatedQuery[key]) {
        params.set(key, updatedQuery[key]);
      } else {
        params.delete(key);
      }
    });
    const queryString = params.toString();
    const updatedPath = queryString ? `${pathname}?${queryString}` : pathname;
    router.replace(updatedPath, { scroll: false });
  };

  useEffect(() => {
    console.log("updating search params");
    if (searchParams.has("model")) {
      if (searchParams.get("model") === model) {
        return;
      }
    }
    updateSearchQuery({ model: model });
  }, [model]);

  const startPolling = (id: string) => {
    console.log("posting id");
    console.log({ executionId: id });
    try {
      pollingIntervalRef.current = window.setInterval(async () => {
        const response = await fetch("/api/pollCompletionStatus", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ executionId: id }),
        });
        const data = await response.json();
        console.log(data);
        if (data.res.state === "succeed") {
          console.log("\n\n ---------------- \n succeed!!!");
          window.clearInterval(pollingIntervalRef.current);
          console.log("completed");

          //TODO: add error handling

          setJSONtoSave(JSON.stringify(data.res.result));
          console.log(data.res.result.data.sections)
          setCompletionState(data.res.result.data.sections);
          setIsLoading(false);
        }
      }, 1000);
    } catch (e) {
      console.log(e);
      pollingIntervalRef.current = null;
      setIsLoading(false);
    }
  };

  const getCompletion = async () => {
    setIsLoading(true);
    setError(false);
    try {
      const response = await fetch("/api/getCompletion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: content, model: model }),
      });
      const data = await response.json();
      console.log(data);
      executionIdRef.current = data.executionId;
    
      startPolling(data);
    } catch (e) {
      console.log(e);
      pollingIntervalRef.current = null;
      setIsLoading(false);
      setError(true);
    }
  };

  console.log("executionIdRef");
  console.log(executionIdRef.current);

  return (
    <div className="flex w-full max-w-[1000px] relative">
      <div className="relative w-full  rounded-xl border p-10 pt-20 pb-10 flex bg-white dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100">
        {/*border svgs*/}
        <div className="absolute p-10 pt-20 pb-10 left-0 top-0 h-full w-full flex pointer-events-none justify-between z-10 d">
          <div
            className={`w-full relative ${
              textAreaFocused ? "opacity-100" : "opacity-50"
            }`}
          >
            <svg
              width="8"
              height="8"
              className={` dark:stroke-white ${
                isLoading ? "animate-pulse" : ""
              }`}
              viewBox="0 0 72 71"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.874634"
                y="0.539673"
                width="70.2224"
                height="10.686"
                className="dark:fill-white fill-black"
              />
              <rect
                x="11.5607"
                y="0.539673"
                width="70.2224"
                height="10.686"
                transform="rotate(90 11.5607 0.539673)"
                className="dark:fill-white fill-black"
              />
            </svg>
            <svg
              className={`right-0 absolute top-0 scale-x-[-1] ${
                isLoading ? "animate-pulse" : ""
              }`}
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
                className="dark:fill-white fill-black"
              />
              <rect
                x="11.5607"
                y="0.539673"
                width="70.2224"
                height="10.686"
                transform="rotate(90 11.5607 0.539673)"
                className="dark:fill-white fill-black"
              />
            </svg>
            <svg
              className={`bottom-0 absolute scale-y-[-1] ${
                isLoading ? "animate-pulse" : ""
              }`}
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
                className="dark:fill-white fill-black"
              />
              <rect
                x="11.5607"
                y="0.539673"
                width="70.2224"
                height="10.686"
                transform="rotate(90 11.5607 0.539673)"
                className="dark:fill-white fill-black"
              />
            </svg>
            <svg
              className={`bottom-0 right-0 absolute scale-y-[-1] scale-x-[-1] ${
                isLoading ? "animate-pulse" : ""
              }`}
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
                className="dark:fill-white fill-black"
              />
              <rect
                x="11.5607"
                y="0.539673"
                width="70.2224"
                height="10.686"
                transform="rotate(90 11.5607 0.539673)"
                className="dark:fill-white fill-black"
              />
            </svg>
          </div>
        </div>

        {completionState ? (
          <div
            className={`  w-full h-[80vh] max-h-[500px]  p-4 placeholder:font-medium`}
          >
            <AnnotatedText text={content} sections={completionState || []} />
          </div>
        ) : (
          <>
            <textarea
              name="text"
              required
              onFocus={() => setTextAreaFocused(true)}
              onBlur={() => setTextAreaFocused(false)}
              className={`resize-none w-full dark:text-white placeholder:dark:text-zinc-100 dark:bg-zinc-900 h-[80vh] placeholder:font-mono max-h-[500px]  p-4 placeholder:font-medium placeholder:opacity-50 focus:placeholder:opacity-100 placeholder:text-black focus:outline-none placeholder:text-lg ${
                isLoading ? "animate-pulse" : ""
              }`}
              autoFocus
              placeholder="Paste a page"
              content={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <input
              readOnly
              className="hidden pointer-events-none"
              name="model"
              value={model}
            ></input>
          </>
        )}

        <div className="absolute flex w-full border-b dark:border-zinc-600 left-0 justify-between top-0  p-4 h-14 text-sm z-0 items-center">
          <div className="flex gap-10 items-center">
            <h2 className="opacity-50 py-1">Text Analysis Playground</h2>
          </div>
          {/*submit button or trash button*/}
          {completionState ? ( //if form is submitted + annotation is shown
            <div className="flex gap-5">
              <button
                className="text-black  rounded-md underline opacity-50 underline-offset-2 decoration-2 decoration-black/50 dark:decoration-white/50 hover:opacity-100"
                onClick={(e) => {
                  e.preventDefault();
                  const outputObj = {
                    text: content,
                    analysis: jsonToSave,
                  };
                  const dataStr = JSON.stringify(outputObj, null, 2); // Convert to JSON string with pretty print
                  const blob = new Blob([dataStr], {
                    type: "application/json",
                  });
                  const url = URL.createObjectURL(blob);
                  const link = document.createElement("a");
                  link.download = "sections.json";
                  link.href = url;
                  link.click();
                  URL.revokeObjectURL(url); // Clean up
                }}
              >
                <span className="flex items-center gap-1.5 dark:text-zinc-100">
                  {" "}
                  download JSON
                </span>
              </button>

              <button
                className="text-white bg-red-600 rounded-md  px-4 py-1 pr-3 transition-colors  hover:bg-red-500"
                onClick={(e) => {
                  e.preventDefault();
                  setContent("");
                  formRef.current?.reset();
                  setCompletionState(undefined);
                }}
              >
                <span className="flex items-center gap-1.5 py-0.5 ">
                  {" "}
                  try another text{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="17"
                    viewBox="0 -960 960 960"
                    width="17"
                    className="fill-white"
                  >
                    <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                  </svg>
                </span>
              </button>
            </div>
          ) : (
            <div className="text-base relative flex gap-4">
              {!isLoading ? (
                <div className="flex gap-4">
                  <div>
                    <Select
                      value={model}
                      onValueChange={(value) => setModel(value as models)}
                    >
                      <SelectTrigger className="">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent
                        defaultValue="gpt-4-0613"
                        className="pb-3 pt-1"
                      >
                        <SelectGroup>
                          <SelectLabel>
                            <div className="opacity-50 text-xs mt-1 font-medium translate-y-1">
                              Stable Models
                            </div>
                          </SelectLabel>
                          <SelectItem value="gpt-4-0613">GPT-4 0631</SelectItem>
                          <SelectItem value="gpt-3.5-turbo-1106">
                            GPT-3.5 Turbo 1106
                          </SelectItem>
                        </SelectGroup>
                        <SelectGroup>
                          <SelectLabel>
                            <div className="opacity-50 mt-1 text-xs font-medium translate-y-1">
                              Preview Models
                            </div>
                          </SelectLabel>
                          <SelectItem value="gpt-4-1106-preview">
                            GPT-4 Turbo 1106
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  <Sheet>
                    <SheetTrigger className="border rounded-md px-4 py-1 text-sm focus:outline outline-2 focus:outline-black dark:border-zinc-600 ">
                      settings
                    </SheetTrigger>
                    <SheetContent className="dark:text-white">
                      <SheetHeader>
                        <SheetTitle className="dark:text-zinc-100">
                          Settings
                        </SheetTitle>
                        <SheetDescription className="dark:text-zinc-100/50">
                          Check our defaults and change them if you want
                        </SheetDescription>
                      </SheetHeader>

                      <div className="mt-10">
                        <label className="text-sm pb-2 block opacity-50">
                          System Prompt
                        </label>
                        <textarea
                          className="w-full h-40 border dark:border-zinc-600 rounded-md dark:bg-zinc-900 focus:outline-black p-4"
                          defaultValue={defaultSystemPrompt}
                        ></textarea>
                      </div>
                      <div className="mt-10">
                        <label className="text-sm pb-2 block opacity-50">
                          Function Description
                        </label>
                        <textarea
                          className="w-full h-40 border dark:border-zinc-600 rounded-md dark:bg-zinc-900 focus:outline-black p-4"
                          defaultValue={defaultFunctionCallDescription}
                        ></textarea>
                      </div>
                      <div className="mt-10 flex flex-col">
                        <label className="text-sm pb-2 block opacity-50">
                          Temperature
                        </label>
                        <input
                          type={"number"}
                          className="w-20 border dark:border-zinc-600 rounded-md dark:bg-zinc-900 py-2 px-4 focus:outline-black"
                          step={0.1}
                          max={1}
                          min={0}
                          defaultValue={defaultTemperature}
                        ></input>
                      </div>
                      <div className="mt-10 flex flex-col">
                        <label className="text-sm pb-2 block opacity-50">
                          Seed
                        </label>
                        <input
                          type="number"
                          name="seed"
                          placeholder="optional"
                          className="bg-white dark:bg-zinc-900 border dark:border-zinc-600 px-2 w-full rounded-md py-1.5 focus:outline-black"
                          step={1}
                        />
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              ) : null}
              <SubmitButton content={content} pending={isLoading} getCompletion={getCompletion} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnnotationPlayground;
