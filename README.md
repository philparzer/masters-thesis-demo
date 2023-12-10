# LLM-based Text Analysis for Translation of Literary Texts

This repository contains the <a href="https://llm-text-analysis.vercel.app/"> demo showcase</a> of the system outlined in the paper <em>LLM-based Text Analysis for Translation of Literary Texts</em>. 

The paper introduces a novel enhancement of human-in-the-loop literary translation processes by including LLMs. LLMs annotate the source text hinting at possible pitfalls, hard to translate sections, and other peculiarities. This increases human translators' efficiency, as translators can focus on translation problems and spend less time post-editing standard language.

For a more detailed description of the system outlined, please refer to the <a href="https://llm-text-analysis.vercel.app/"> demo showcase</a> or take a look at the paper.

## Technical Details

This technical details section aims at providing a overview for non-technical and technical readers alike. For a more detailed description of the system, please refer to the paper or take a look at the code.

### Frontend

The frontend is implemented using Typescript, NextJS 14, and TailwindCSS. The frontend is deployed on Vercel.

### Backend

The backend is implemented using NextJS API routes in combination with long runnning jobs on Defer that are used to handle LLM inference. Supabase is used as a database to store user input and LLM output. The backend is deployed on Vercel, Defer, and Supabase.

### LLMs

The LLMs used are GPT-4 0631, GPT-4  Turbo 1106, and GPT-3.5 Turbo 1106. OpenAI's API is used to interact with the LLMs.

## Local Setup

TODO

## Contributing

TODO
