import { z } from "zod";

export const modelSchema = z.enum(["gpt-4-0613", "gpt-4-1106-preview", "gpt-3.5-turbo-1106"]);
export type models = z.infer<typeof modelSchema>;