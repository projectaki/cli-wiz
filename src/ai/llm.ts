import { ChatOpenAI } from "langchain/chat_models/openai";
import { PromptDict, prompts, TypedLLMChain } from "./prompt.js";
import { LLMChainInput } from "langchain/chains";
import { BufferMemory } from "langchain/memory";
import color from "picocolors";

export const OPENAI_CHAT_CLIENT = new ChatOpenAI({
  temperature: 0.9,
  modelName: "gpt-3.5-turbo",
  streaming: true,
  callbacks: [
    {
      handleLLMNewToken(token: string) {
        process.stdout.write(color.bold(color.white(token)));
      },
    },
  ],
});

export function createLLMChain<K extends keyof PromptDict>(promptType: K, options: Partial<LLMChainInput> = {}) {
  const chain = new TypedLLMChain<K>({
    ...options,
    prompt: prompts[promptType].value,
    llm: OPENAI_CHAT_CLIENT,
    memory: new BufferMemory({ returnMessages: true, memoryKey: "history" }),
  });

  return chain;
}