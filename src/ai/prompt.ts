import { LLMChain } from "langchain/chains";
import { LLMChainInput } from "langchain/chains";
import { ChatPromptTemplate, HumanMessagePromptTemplate, MessagesPlaceholder, PromptTemplate, SystemMessagePromptTemplate } from "langchain/prompts";

export const prompts = {
    default: {
        name: 'Default',
        value: ChatPromptTemplate.fromPromptMessages([
          SystemMessagePromptTemplate.fromTemplate(
            "You are a helpful assistant that will answer my questions. If you don't know the answer, then say that."
          ),
          new MessagesPlaceholder("history"),
          HumanMessagePromptTemplate.fromTemplate("{prompt}"),
        ]),
        inputs: ['prompt']
    },
    codeGen: {
        name: 'Code generation',
        value: ChatPromptTemplate.fromPromptMessages([
          SystemMessagePromptTemplate.fromTemplate(
            "You are a Senior software engineer that writes code. The response should only be code and not contain anything else."
          ),
          new MessagesPlaceholder("history"),
          HumanMessagePromptTemplate.fromTemplate("{prompt}"),
        ]),
        inputs: ['prompt']
    },
} as const;

export type PromptDict = typeof prompts;

export class TypedLLMChain<K extends keyof PromptDict> extends LLMChain {
    constructor(fields: LLMChainInput) {
        super(fields);
    }

    async call(record: Record<PromptDict[K]['inputs'][number], string>) {
        return super.call(record);
    }
}