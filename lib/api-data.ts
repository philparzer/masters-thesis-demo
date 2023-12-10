//open ai api constants and presets

export const defaultSystemPrompt = `Always call the function analyze_text_for_translation, always return JSON! You analyze the text as a translator would, considering hard to translate parts of the text. The descriptions should be in English and concise, no need for full sentences. The target group of this function is translators, so terminology specific to linguistics and translation studies can be used. Return each phrase only once. Return only the phrases that are hard, not entire sentences, unless the entire sentence is hard to translate. Don't attempt to translate the phrase. Explain why it's hard, and what makes it hard to translate. Include possible pitfalls for machine translation systems if applicable.`;
export const defaultTemperature = 0.7;
export const defaultFunctionCallDescription = `Analyze the text and return an array of phrases that are hard to translate or are part of what could be considered unusual use of language and a description of why the parts are hard to translate: e.g. play with words, language or culture specific references, etc.`;
