"use server";

import OpenAI from "openai";
import { functions } from "@/lib/openai-functions";
import { z } from "zod";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: "org-N5j3aFmngeH9aG6YSMfDKOzU",
});

import { revalidatePath } from "next/cache";

export async function analyzeText(prevState: any, formData: FormData) {
  try {
    //test with await and timeout promise

    let isValidFunctionCall = false;

    let text = await formData.get("text");
    console.log(text);

    if (!text) {
      console.log("no text error");
      return { message: "No text provided" };
    }

    text = text as string;

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `Always use analyze_text_for_translation, always return JSON! You analyze the text as a translator would, considering hard to translate parts of the text. The descriptions should be in English. The target group of this function is translators, so terminology specific to linguistics and translation studies can be used. Return each phrase only once. Don't answer in full sentences. Use short and precise language.`,
        },
        { role: "user", content: text },
      ],
      model: "gpt-4",
      functions,
      function_call: "auto",
    });
   
    isValidFunctionCall = completion.choices[0].message.function_call?.arguments ? true : false;

    console.log("\n")
    console.log("option1 ------------------");
    console.log(completion.choices[0].message.function_call?.arguments);
    console.log("------------------");

    console.log("\n")
    console.log("option2 ------------------");
    console.log(completion.choices[0].message.content);
    console.log("------------------");

    console.log("\n")

    //TODO: call openai api here
    //TODO: save results in DB

    if (!isValidFunctionCall) {
      console.log("error in completion");
      return { message: "Failed to create" };
    }

    let schema = z.array(z.object({
      phrase: z.string(),
      description: z.string(),
    })
    );

    if (!completion.choices[0].message.function_call?.arguments) { //ts is stupid :()
      console.log("error in completion");
      return { message: "Failed to create" };
    }

    let json = JSON.parse(completion.choices[0].message.function_call?.arguments)
    let validate = schema.safeParse(json.sections);

    if (!validate.success) {
      console.log("error in schema validation");
      return { message: "Invalid GPT output" };
    }

    await new Promise((resolve) => setTimeout(resolve, 2000));
    revalidatePath("/");
    //TODO: check validity of response json choices[0]
    return json;
  } catch (e) {
    console.log("error", e);
    return { message: "Failed to create" };
  }
}
