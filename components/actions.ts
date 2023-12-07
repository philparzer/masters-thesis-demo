"use server";

import OpenAI from "openai";
import { functions } from "@/lib/openai-functions";
import { z } from "zod";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: "org-N5j3aFmngeH9aG6YSMfDKOzU",
});

import { revalidatePath } from "next/cache";
import { modelSchema } from "@/lib/types";

export async function analyzeText(prevState: any, formData: FormData) {

  const isValidModelChoice = modelSchema.safeParse(
    formData.get("model") as string
  );

  // console.log(formData.get("seed"))
  // TODO: seems broken on OpenAI's end -> hence commented out
  // const isValidSeed = z.number().int().safeParse(parseInt(formData.get("seed") as string));
  // if (!isValidSeed.success) {
  //   console.log("error in seed");
  //   return {
  //     message: "Invalid seed. Your query parameters are invalid.",
  //     type: "error",
  //   };
  // }

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

    let text = await formData.get("text");

    if (!text) {
      console.log("no text error");
      return { message: "No text provided", type: "error" };
    }

    text = text as string;

    const inputSeed = parseInt(formData.get("seed") as string) || Math.floor(Math.random() * 1000000)

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `Always call the function analyze_text_for_translation, always return JSON! You analyze the text as a translator would, considering hard to translate parts of the text. The descriptions should be in English and concise, no need for full sentences. The target group of this function is translators, so terminology specific to linguistics and translation studies can be used. Return each phrase only once. Return only the phrases that are hard, not entire sentences, unless the entire sentence is hard to translate. Don't attempt to translate the phrase. Explain why it's hard, and what makes it hard to translate. Include possible pitfalls for machine translation systems if applicable.`,
        },
        { role: "user", content: text },
      ],
      model: formData.get("model") as string,
      functions,
      function_call: "auto",
      // seed: inputSeed,
    });

    isValidFunctionCall = completion.choices[0].message.function_call?.arguments
      ? true
      : false;

    //TODO: save results in DB
    // console.log("\n\n\nTODO SAVE THIS IN DB")
    // console.log(completion)

    //TODO: when seed is fixed, save seed in DB
    // console.log("and save Seed", inputSeed)

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

    if (!validate.success) {
      console.log("error in schema validation");
      return { message: "Invalid GPT output", type: "error" };
    }

    revalidatePath("/");
    //TODO: check validity of response json choices[0]
    return json;
  } catch (e) {
    console.log("error", e);
    return { message: "Failed to create", type: "error" };
  }
}
