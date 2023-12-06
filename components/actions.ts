'use server'

import { revalidatePath } from "next/cache"

export async function analyzeText(prevState: any, formData: FormData) {
  try {
    //test with await and timeout promise

    let content = await formData.get('text')
    console.log(content)

    //TODO: call openai api here

    await new Promise(resolve => setTimeout(resolve, 2000))
    revalidatePath('/')
    return{ sections: [
      {
        phrase: "эмэл философии",
        description: "This phrase appears to be a play on words, or possibly a misspelling."
      },
      {
        phrase: "маленькому ушастому доценту, похожему из одолеваемого кощунственными мыслями попика",
        description: "'This phrase includes a complex description that mixes physical traits ('small', I'big-eared\') with an abstract concept (l'overwhelmed by sacrilegious thoughts\')."
      },
      {
        phrase: "Никиту начинало смертельно клонить в сон",
        description: "This phrase uses an idiomatic expression to be 'deadly drowsy' which may not have a direct equivalent in the target language"
      }
    ] }


  } catch (e) {
    console.log("error")
    return { message: 'Failed to create' }
  }
}
