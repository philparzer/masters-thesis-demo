"use server";

//this function runs as a background job on defer.run -> why? because it takes a long time to run on Vercel serverless functions
//another option would be to stream the result e.g. https://github.com/steven-tey/chathn/blob/main/app/api/chat/route.ts

import OpenAI from "openai";
import { functions, getCustomizedFunction } from "@/lib/openai-functions";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import { isValidISO6391Code } from "@/lib/utils";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: "org-N5j3aFmngeH9aG6YSMfDKOzU",
});

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl as string, supabaseAnonKey as string);

import { modelSchema } from "@/lib/types";

export default async function analyzeText({
  model,
  text,
  temperature,
  systemPrompt,
  functionCallDescription,
}: {
  model: string;
  text: string;
  temperature: number;
  systemPrompt: string;
  functionCallDescription: string;
}) {
  const isValidModelChoice = modelSchema.safeParse(model as string);
  const isValidTemperature = z.number().max(2).min(0).safeParse(temperature);
  const isValidSystemPrompt = z.string().safeParse(systemPrompt);
  const isValidFunctionCallDescription = z.string().safeParse(
    functionCallDescription
  );

  const startTime = performance.now();

  if (!isValidModelChoice.success) {
    console.log("error in model choice");
    return {
      message: "Invalid model choice. Your query parameters are invalid.",
      type: "error",
    };
  }

  if (!isValidTemperature.success) {
    console.log("error in temperature");
    return {
      message: "Invalid temperature. Your settings are invalid.",
      type: "error",
    };
  }

  if (!isValidSystemPrompt.success) {
    console.log("error in systemPrompt");
    return {
      message: "Invalid systemPrompt. Your settings are invalid",
      type: "error",
    };
  }

  if (!isValidFunctionCallDescription.success) {
    console.log("error in functionCallDescription");
    return {
      message: "Invalid functionCallDescription. Your settings are invalid.",
      type: "error",
    };
  }

  try {
    //test with await and timeout promise

    let isValidFunctionCall = false;

    if (!text) {
      console.log("no text error");
      return { message: "No text provided", type: "error" };
    }

    text = text as string;

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        { role: "user", content: text },
      ],
      model: model,
      temperature: temperature,
      functions: getCustomizedFunction(functionCallDescription),
      function_call: "auto",
      // seed: inputSeed TODO:,
    });

    isValidFunctionCall = completion.choices[0].message.function_call?.arguments
      ? true
      : false;

    if (!isValidFunctionCall) {
      //if gpt didnt return a valid function call
      console.log("Failed to create");
      return {
        message:
          "GPT labels this input as invalid, are you sure your input is a literary text you want to translate?",
        type: "error",
      };
    }

    let schema = z.array(
      z.object({
        phrase: z.string(),
        description: z.string(),
      })
    );

    if (!completion.choices[0].message.function_call?.arguments) {
      //if gpt didnt return a valid function call
      console.log("error in completion");
      return {
        message:
          "GPT labels this input as invalid, are you sure your input is a literary text you want to translate?",
        type: "error",
      };
    }

    let json = JSON.parse(
      completion.choices[0].message.function_call?.arguments
    );
    let validate = schema.safeParse(json.sections);

    console.log("json");
    console.log(json);

    if (!validate.success) {
      console.log("error in schema validation");
      return { message: "Invalid GPT output", type: "error" };
    }
  
    let language;

    try {
      language = json.source_language;
      if (isValidISO6391Code(language)) {
        console.log("language is valid");
      }

      else {
        console.log("language is invalid");
        language = "unknown";
      }
    }

    catch {
      console.log("language is invalid");
      language = "unknown";
    }
    
    const endTime = performance.now();
    const executionTime = Math.floor(endTime - startTime)

    //save to supabase
    console.log("saving data")
    const { data, error } = await supabase
      .from("completions")
      .insert([{ model, language, execution_time: executionTime, api_response: completion, input_text: text, function_call_description: functionCallDescription, system_prompt: systemPrompt, temperature }]);

    if (error) throw error;
    console.log("saved", data);
    //TODO: check validity of data -> if sections exists etc
    return { jsonToSave: completion, data: json };
  } catch (e) {
    console.log("error", e);
    return { message: "Failed to create", type: "error" };
  }
}
