"use server";

//this function runs as a background job on defer.run -> why? because it takes a long time to run on Vercel serverless functions
//another option would be to stream the result e.g. https://github.com/steven-tey/chathn/blob/main/app/api/chat/route.ts

import OpenAI from "openai";
import { functions } from "@/lib/openai-functions";
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

import { iso6391Code, modelSchema } from "@/lib/types";

export default async function analyzeText({
  model,
  text,
  targetLanguage,
}: {
  model: string;
  text: string;
  targetLanguage?: iso6391Code;
}) {
  const isValidModelChoice = modelSchema.safeParse(model as string);


  const startTime = performance.now();

  if (!isValidModelChoice.success) {
    console.log("error in model choice");
    return {
      message: "Invalid model choice. Your query parameters are invalid.",
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
          content: `Always call the function analyze_text_for_translation, always return JSON! You analyze the text as a translator would, considering hard to translate parts of the text. The user wants to translate this text to ${targetLanguage} (ISO 639-1); when relevant try to incorporate language specific information. The descriptions should be in English and concise, no need for full sentences. The target group of this function is translators, so terminology specific to linguistics and translation studies can be used. Return each phrase only once. Return only the phrases that are hard, not entire sentences, unless the entire sentence is hard to translate. Don't attempt to translate the phrase. Explain why it's hard, and what makes it hard to translate. Include possible pitfalls for machine translation systems if applicable.`,
        },
        { role: "user", content: text },
      ],
      model: model,
      functions,
      function_call: "auto",
      // seed: inputSeed,
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
      .insert([{ model, source_language: language, execution_time: executionTime, api_response: completion, target_language: targetLanguage }]);

    if (error) throw error;
    console.log("saved", data);
    //TODO: check validity of data -> if sections exists etc
    return { jsonToSave: completion, data: json };
  } catch (e) {
    console.log("error", e);
    return { message: "Failed to create", type: "error" };
  }
}
