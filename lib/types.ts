//zod schemas and types used in the app

import { z } from "zod";
import { iso6391Codes } from "./utils";

export type iso6391Code = typeof iso6391Codes[number];

export const modelSchema = z.enum(["gpt-4-0613", "gpt-4-1106-preview", "gpt-3.5-turbo-1106"]);

export type models = z.infer<typeof modelSchema>;