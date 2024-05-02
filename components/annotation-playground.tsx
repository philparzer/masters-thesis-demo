"use client";

//wrapper component for annotation playground

import { useEffect, useRef, useState } from "react";
import AnnotatedText from "./annotated-text";
import { modelSchema, models } from "@/lib/types";
import { toast } from "sonner";
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
import TextAreaDecoration from "./text-area-decoration";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import {
  defaultFunctionCallDescription,
  defaultSystemPrompt,
  defaultTemperature,
} from "@/lib/api-data";
import { setCookie, getCookie } from "cookies-next";

interface SubmitButtonInterface {
  content: string;
  pending: boolean;
  getCompletion: () => void;
}

const maxCharCount = 3000; //roughly 1.5 pages

const SubmitButton = ({
  content,
  pending,
  getCompletion,
}: SubmitButtonInterface) => {
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
        } left-0 top-0 flex  items-center gap-2 rounded-md text- text-white dark:bg-white dark:text-black px-4 py-1 bg-black border pr-3 transition-colors  border-black`}
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
  const formRef = useRef<HTMLFormElement>(null);
  const [functionCallDescription, setFunctionCallDescription] =
    useState<string>(defaultFunctionCallDescription);
  const [systemPrompt, setSystemPrompt] = useState<string>(defaultSystemPrompt);
  const [temperature, setTemperature] = useState<number>(defaultTemperature);

  const [completionState, setCompletionState] =
    useState<{ phrase: string; description: string }[]>();
  const [model, setModel] = useState<models>(
    modelSchema.safeParse(searchParams.get("model")).success
      ? (searchParams.get("model") as models)
      : "gpt-4-turbo"
  );

  //handles query params (getting/setting model)
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

  //handles query params (getting/setting model)
  useEffect(() => {
    console.log("updating search params");
    if (searchParams.has("model")) {
      if (searchParams.get("model") === model) {
        return;
      }
    }
    updateSearchQuery({ model: model });
  }, [model]);

  //starts polling for completion status of background job; polls each second
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
          window.clearInterval(pollingIntervalRef.current);
          console.log("-> polling completed");

          try {
            setJSONtoSave(JSON.stringify(data.res.result));
            console.log(data.res.result.data.sections);
            setCompletionState(data.res.result.data.sections);
            setIsLoading(false);
          } catch {
            console.log("error parsing response");
            if (data.res.result && data.res.result.type === "error") {
              toast.error(data.res.result.message);
            } else {
              toast.error("Error parsing response");
            }

            setIsLoading(false);
          }
        }
      }, 1000);
    } catch (e) {
      console.log(e);
      pollingIntervalRef.current = null;
      toast.error("Error polling completion status");
      setIsLoading(false);
    }
  };

  //called when user clicks on analyze button, calls api endpoint to start OPENAI completion as background job
  const getCompletion = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/getCompletion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: content,
          model,
          systemPrompt,
          functionCallDescription,
          temperature,
        }),
      });
      const data = await response.json();
      console.log(data);
      executionIdRef.current = data.executionId;

      startPolling(data);
    } catch (e) {
      console.log(e);
      pollingIntervalRef.current = null;
      setIsLoading(false);
      toast.error("Error starting completion");
    }
  };

  useEffect(() => {
    getCookie("temperature") &&
      setTemperature(Number(getCookie("temperature")));
    getCookie("functionCallDescription") &&
      setFunctionCallDescription(String(getCookie("functionCallDescription")));
    getCookie("systemPrompt") &&
      setSystemPrompt(String(getCookie("systemPrompt")));
  }, []);

  const setSettingsCookie = () => {
    setCookie("temperature", temperature);
    setCookie("functionCallDescription", functionCallDescription);
    setCookie("systemPrompt", systemPrompt);
    toast.success("Settings saved");
  };

  return (
    <div className="flex w-full max-w-[1000px] relative">
      <div className="relative mt-10  lg:mt-0 w-full  rounded-xl border pt-20 p-7 lg:p-10 lg:pt-20 pb-10 flex bg-white dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100">
        <div className="absolute w-full text-center -bottom-14 md:-bottom-7 left-0 opacity-30 text-xs px-4 py-1">
          by using this playground, you acknowledge and agree that your
          submissions will be stored in a public database for research purposes
        </div>
        {/*border svgs*/}
        <div className="absolute p-6 pt-20 lg:p-10 lg:pt-20 pb-10 left-0 top-0 h-full w-full flex pointer-events-none justify-between z-10 d">
          <div
            className={`w-full relative ${
              textAreaFocused ? "opacity-100" : "opacity-50"
            }`}
          >
            <TextAreaDecoration isLoading={isLoading} />
          </div>
        </div>

        {completionState ? (
          <div
            className={`  w-full overflow-scroll h-[80vh] max-h-[500px]  p-4 placeholder:font-medium`}
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
              className={`resize-none w-full dark:text-white placeholder:dark:text-zinc-100 dark:bg-zinc-900 h-[80vh] placeholder:font-mono max-h-[500px]  p-2 lg:p-4  placeholder:font-medium placeholder:opacity-50 focus:placeholder:opacity-100 placeholder:text-black focus:outline-none lg:placeholder:text-lg ${
                isLoading ? "animate-pulse-fast" : ""
              }`}
              autoFocus
              placeholder="Paste a page"
              content={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </>
        )}

        <div className="absolute flex w-full border-b dark:border-zinc-600 left-0 justify-between top-0 p-4 h-14 text-sm z-0 items-center">
          <div className="flex gap-2 items-center">
            <h2 className="opacity-50 py-1 hidden sm:block">
              Text Analysis Playground
            </h2>
          </div>

          {completionState ? ( //if form is submitted + annotation is shown
            <div className="flex gap-5">
              <button
                className="text-black  rounded-md underline opacity-50 underline-offset-2 decoration-2 decoration-black/50 dark:decoration-white/50 hover:opacity-100"
                onClick={(e) => {
                  e.preventDefault();
                  const sections = JSON.parse(jsonToSave!);
                  const outputObj = {
                    text: content,
                    sections: sections.data.sections,
                    temperature: temperature,
                    systemPrompt: systemPrompt,
                    functionCallDescription: functionCallDescription,
                  };
                  const dataStr = JSON.stringify(outputObj, null, 2); // Convert to JSON string with pretty print 
                  const blob = new Blob([dataStr], {
                    type: "application/json",
                  });
                  const url = URL.createObjectURL(blob);
                  const link = document.createElement("a");
                  link.download = `${JSON.parse(jsonToSave!).data.source_language}-${new Date().toLocaleTimeString().replace(" ", "-")}-llm-text-analysis.json`;
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
                          <SelectItem value="gpt-4-turbo">GPT-4-Turbo</SelectItem>
                        </SelectGroup>
                        <SelectGroup>
                          <SelectLabel>
                            <div className="opacity-50 mt-1 text-xs font-medium translate-y-1">
                              Preview Models
                            </div>
                          </SelectLabel>
                          <SelectItem value="gpt-3.5-turbo-0125">
                            GPT-3.5 Turbo 1106
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  <Sheet onOpenChange={(open) => !open && setSettingsCookie()}>
                    <SheetTrigger className="border rounded-md px-4 dark:focus:outline-white pr-3 py-1.5 sm:py-1 bg-white dark:bg-zinc-900 absolute sm:static sm:right-auto right-0 sm:translate-y-0 -translate-y-16 text-sm focus:outline outline-2 focus:outline-black dark:border-zinc-600 ">
                      <span className="flex gap-2 items-center">
                        settings
                        <svg
                          width="16"
                          height="16"
                          className="translate-y-[0.5px] fill-black dark:fill-white opacity-50"
                          viewBox="0 -960 960 960"
                          
                          xmlns="http://www.w3.org/2000/svg"
                        >
                         <path d="M440-120v-240h80v80h320v80H520v80h-80Zm-320-80v-80h240v80H120Zm160-160v-80H120v-80h160v-80h80v240h-80Zm160-80v-80h400v80H440Zm160-160v-240h80v80h160v80H680v80h-80Zm-480-80v-80h400v80H120Z"/>
                        </svg>
                      </span>
                    </SheetTrigger>
                    <SheetContent className="dark:text-white">
                      <SheetHeader>
                        <SheetTitle className="dark:text-zinc-100">
                          Settings
                        </SheetTitle>
                        <SheetDescription className="dark:text-zinc-100/50">
                          Check our defaults, use them as is, or change them to
                          your liking
                        </SheetDescription>
                      </SheetHeader>

                      <div className="mt-14">
                        <div className="relative flex gap-4 items-center pb-2">
                          <div>
                            <label
                              htmlFor="system-prompt"
                              className="text-sm block opacity-80"
                            >
                              System Prompt
                            </label>
                          </div>
                        </div>
                        <p className="opacity-50 text-xs mb-1">
                          A set of instructions that directs the AI to produce a
                          specific response. Ambiguous or improperly structured
                          prompts can lead to erroneous or irrelevant outputs.
                          In contrast, a carefully constructed prompt can result
                          in highly relevant and effective outcomes.
                        </p>
                        <div className="flex justify-end ">
                          <button
                            className="text-xs flex gap-1 items-center h-4 hover:text-red-500 hover:fill-red-500 dark:fill-white border-zinc-600"
                            onClick={() => setSystemPrompt(defaultSystemPrompt)}
                          >
                            {systemPrompt === defaultSystemPrompt ? (
                              ""
                            ) : (
                              <>
                                restore default
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  height="16"
                                  viewBox="0 -960 960 960"
                                  width="16"
                                  className=" "
                                >
                                  <path d="M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-110h80v280H520v-80h168q-32-56-87.5-88T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84q-28 106-114 173t-196 67Z" />
                                </svg>
                              </>
                            )}
                          </button>
                        </div>
                        <textarea
                          id="system-prompt"
                          className="w-full text-sm lg:text-base h-40 border dark:border-zinc-600 rounded-md dark:bg-zinc-900 focus:outline-black p-4"
                          onChange={(e) => setSystemPrompt(e.target.value)}
                          value={systemPrompt}
                        ></textarea>
                      </div>
                      <div className="mt-14">
                        <label
                          htmlFor="function-description"
                          className="text-sm pb-2 block opacity-80"
                        >
                          Function Description
                        </label>
                        <p className="opacity-50 text-xs mb-1">
                          Used to describe what the OpenAI function should do
                          with the input it receives. Read more about function
                          calling in{" "}
                          <a
                            className="underline"
                            href="https://platform.openai.com/docs/guides/function-calling"
                            target="_blank"
                          >
                            the OpenAI docs
                          </a>{" "}
                          or check out the schema for the function used in this
                          app{" "}
                          <a
                            className="underline"
                            href="https://github.com/philparzer/masters-thesis-demo/blob/main/lib/openai-functions.ts"
                            target="_blank"
                          >
                            here
                          </a>
                        </p>
                        <div className="flex justify-end">
                          <button
                            className="text-xs  flex gap-1 items-center h-4 hover:text-red-500 hover:fill-red-500 dark:fill-white border-zinc-600"
                            onClick={() =>
                              setFunctionCallDescription(
                                defaultFunctionCallDescription
                              )
                            }
                          >
                            {functionCallDescription ===
                            defaultFunctionCallDescription ? (
                              ""
                            ) : (
                              <>
                                restore default
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  height="16"
                                  viewBox="0 -960 960 960"
                                  width="16"
                                  className=""
                                >
                                  <path d="M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-110h80v280H520v-80h168q-32-56-87.5-88T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84q-28 106-114 173t-196 67Z" />
                                </svg>
                              </>
                            )}
                          </button>
                        </div>
                        <textarea
                          id="function-description"
                          className="w-full text-sm lg:text-base h-40 border dark:border-zinc-600 rounded-md dark:bg-zinc-900 focus:outline-black p-4"
                          onChange={(e) =>
                            setFunctionCallDescription(e.target.value)
                          }
                          value={functionCallDescription}
                        ></textarea>
                      </div>
                      <div className="mt-14 flex flex-col">
                        <label
                          htmlFor="temperature"
                          className="text-sm pb-2 block opacity-80"
                        >
                          Temperature
                        </label>
                        <p className="opacity-50 text-xs mb-3">
                          Lower values for temperature result in more consistent
                          outputs (e.g. 0.2), while higher values generate more
                          diverse and creative results. Select a temperature
                          value based on the desired trade-off between coherence
                          and creativity.
                        </p>
                        <div className="flex gap-4 items-center ">
                          <input
                            id="temperature"
                            type={"number"}
                            className="w-20 border text-sm lg:text-base dark:border-zinc-600 rounded-md dark:bg-zinc-900 py-2 px-4 focus:outline-black"
                            step={0.1}
                            max={2}
                            min={0}
                            value={temperature}
                            onChange={(e) =>
                              setTemperature(Number(e.target.value))
                            }
                          ></input>
                          <div className="flex justify-end">
                            <button
                              className="text-xs flex gap-1 items-center hover:text-red-500 hover:fill-red-500 dark:fill-white border-zinc-600"
                              onClick={() => setTemperature(defaultTemperature)}
                            >
                              {temperature === defaultTemperature ? (
                                ""
                              ) : (
                                <>
                                  restore default
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="16"
                                    viewBox="0 -960 960 960"
                                    width="16"
                                    className=" "
                                  >
                                    <path d="M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-110h80v280H520v-80h168q-32-56-87.5-88T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84q-28 106-114 173t-196 67Z" />
                                  </svg>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="mt-16 flex flex-col">
                        <label
                          htmlFor="seed"
                          className="text-sm font-semibold pb-2 opacity-80 flex gap-2 items-center"
                        >
                          Seed
                          <span className="text-red-500 text-[10px] block -translate-y-2 rounded-full border px-2 border-red-500">
                            coming soon
                          </span>
                        </label>

                        <p className="opacity-50 text-xs mb-3">
                          Seeds are a way to get reproducable results from AI
                          models. OpenAI introduced seeds at their DevDay 2023
                          but, as of now, they don&apos;t seem to work properly.
                        </p>
                        <input
                          id="seed"
                          type={"number"}
                          className="w-full text-sm lg:text-base pointer-events-none border opacity-20 dark:border-zinc-600 rounded-md dark:bg-zinc-900 py-2 px-4 focus:outline-black"
                          placeholder="2349239857113785"
                          disabled
                        ></input>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              ) : null}
              <SubmitButton
                content={content}
                pending={isLoading}
                getCompletion={getCompletion}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnnotationPlayground;
