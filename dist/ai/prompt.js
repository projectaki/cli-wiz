import { LLMChain } from "langchain/chains";
import { ChatPromptTemplate, HumanMessagePromptTemplate, MessagesPlaceholder, SystemMessagePromptTemplate } from "langchain/prompts";
export const prompts = {
    default: {
        label: 'Default',
        value: ChatPromptTemplate.fromPromptMessages([
            SystemMessagePromptTemplate.fromTemplate("You are a helpful assistant that will answer my questions. If you don't know the answer, then say that."),
            new MessagesPlaceholder("history"),
            HumanMessagePromptTemplate.fromTemplate("{prompt}"),
        ]),
        inputs: ['prompt']
    },
    codeGen: {
        label: 'Code generation',
        value: ChatPromptTemplate.fromPromptMessages([
            SystemMessagePromptTemplate.fromTemplate("You are a Senior software engineer that writes code. Only answer strictly with code and nothing else."),
            new MessagesPlaceholder("history"),
            HumanMessagePromptTemplate.fromTemplate("{prompt}"),
        ]),
        inputs: ['prompt']
    },
    cli: {
        label: 'CLI',
        value: ChatPromptTemplate.fromPromptMessages([
            SystemMessagePromptTemplate.fromTemplate(`You are Senior Software Engineer. You specialize in cli commands. You will recieve a prompt, and you will respond only with a cli command. 
            Always respond with only 1 code block that contains the command and a precise explanation of the command.`),
            new MessagesPlaceholder("history"),
            HumanMessagePromptTemplate.fromTemplate("{prompt}"),
        ]),
        inputs: ['prompt']
    }
};
export class TypedLLMChain extends LLMChain {
    constructor(fields) {
        super(fields);
    }
    async call(record) {
        return super.call(record);
    }
}
