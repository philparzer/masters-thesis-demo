import { ChatCompletionCreateParams } from 'openai/resources/chat/index'

export const functions: ChatCompletionCreateParams.Function[] = [
  {
    name: 'analyze_text_for_translation',
    description:
      `Analyze the text and return an array of phrases that are hard to translate or are part of what could be considered unusual use of language and a 
      description of why the parts are hard to translate: e.g. play with words, language or culture specific references, etc.
      `,
    parameters: {
      type: 'object',
      properties: {
      sections: {
        type: 'array', 
        items: {
            type: "object",
            properties: {
                phrase: { type: "string", description: "quoted section of the text that's hard to translate" },
                description: { type: "string", description: "description of the hard to translate section" },
            }
        }
    }
    }
      
    }
  }
]