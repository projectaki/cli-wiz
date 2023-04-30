import { ChatOpenAI } from "langchain/chat_models/openai";
import { prompts, TypedLLMChain } from "./prompt.js";
import { BufferMemory } from "langchain/memory";
import color from "picocolors";
export const OPENAI_CHAT_CLIENT = new ChatOpenAI({
    temperature: 0.9,
    modelName: "gpt-3.5-turbo",
    streaming: true,
    callbacks: [
        {
            handleLLMNewToken(token) {
                process.stdout.write(color.bold(color.white(token)));
            },
        },
    ],
});
export function createLLMChain(promptType, options = {}) {
    const chain = new TypedLLMChain({
        ...options,
        prompt: prompts[promptType].value,
        llm: OPENAI_CHAT_CLIENT,
        memory: new BufferMemory({ returnMessages: true, memoryKey: "history" }),
    });
    return chain;
}
