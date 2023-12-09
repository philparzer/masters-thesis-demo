"use client";

import { useRef, useState } from "react";
import { set } from "zod";

interface TestCompletionProps {}

const TestCompletion = ({}: TestCompletionProps) => {
  const executionIdRef = useRef(null);
  const pollingIntervalRef = useRef<any>(null);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<any>(null);

  const startPolling = (id: string) => {
    console.log("posting id");
    console.log({ executionId: id });
    try {
      pollingIntervalRef.current = window.setInterval(async () => {
        const response = await fetch(
          "http://localhost:3000/api/pollCompletionStatus",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ executionId: id }),
          }
        );
        const data = await response.json();
        console.log(data);
        if (data.res.state === "succeed") {
          console.log("\n\n ---------------- \n succeed!!!");
          window.clearInterval(pollingIntervalRef.current);
          console.log("completed");
          setResult(JSON.stringify(data.res.result));
          setLoading(false);
        }
      }, 1000);
    } catch (e) {
      console.log(e);
      pollingIntervalRef.current = null;
      setLoading(false);
    }
  };

  const getCompletion = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await fetch("http://localhost:3000/api/getCompletion", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      executionIdRef.current = data.executionId;

      startPolling(data);
    } catch (e) {
      console.log(e);
      pollingIntervalRef.current = null;
      setLoading(false);
      setError(true);
    }
  };

  console.log("executionIdRef");
  console.log(executionIdRef.current);

  return (
    <div className="mt-20 bg-black border text-green-500 flex flex-col gap-10 p-10">
      <div>
        <button
          disabled={loading}
          className="bg-red-500 px-4 py-2 rounded-md text-white"
          onClick={() => getCompletion()}
        >
          check defer completion {executionIdRef.current}
        </button>
      </div>
      {loading ? (
        <div className="animate-pulse">loading...</div>
      ) : result ? (
        <div>{result}</div>
      ) : error ? (
        <div className="text-red-500">Error</div>
        ) : null}
    </div>
  );
};

export default TestCompletion;
