//zod schemas and types used in the app

import { z } from "zod";

export const modelSchema = z.enum(["gpt-4-turbo", "gpt-3.5-turbo-0125"]);
export type models = z.infer<typeof modelSchema>;