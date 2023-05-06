import { LLMChain } from "langchain/chains";
import { LLMChainInput } from "langchain/chains";
import { ChatPromptTemplate, HumanMessagePromptTemplate, MessagesPlaceholder, PromptTemplate, SystemMessagePromptTemplate } from "langchain/prompts";

export const prompts = {
    default: {
        label: 'Default',
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
        label: 'Code generation',
        value: ChatPromptTemplate.fromPromptMessages([
          SystemMessagePromptTemplate.fromTemplate(
            "You are a Senior software engineer that writes code. Only answer strictly with code and nothing else."
          ),
          new MessagesPlaceholder("history"),
          HumanMessagePromptTemplate.fromTemplate("{prompt}"),
        ]),
        inputs: ['prompt']
    },
    cli: {
      label: 'CLI',
      value: ChatPromptTemplate.fromPromptMessages([
        SystemMessagePromptTemplate.fromTemplate(
          `You are Senior Software Engineer. You specialize in cli commands. You will recieve a prompt, and you will respond only with a cli command. 
            Always respond with only 1 code block that contains the command and a precise explanation of the command.`
        ),
        new MessagesPlaceholder("history"),
        HumanMessagePromptTemplate.fromTemplate("{prompt}"),
      ]),
      inputs: ['prompt']
    },
    scrum: {
      label: 'Scrum',
      value: ChatPromptTemplate.fromPromptMessages([
        SystemMessagePromptTemplate.fromTemplate(
          `You are a Scrum Master. You will recieve a large task, and you will help break them down into smaller tasks.
            A tasks can have subtasks, but only 1 level deep. Return the list of tasks in markdown.`
        ),
        new MessagesPlaceholder("history"),
        HumanMessagePromptTemplate.fromTemplate("{prompt}"),
      ]),
      inputs: ['prompt']
    }
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