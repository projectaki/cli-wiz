import inquirer from "inquirer";
import chalk from "chalk";
import { typedKeys } from "../utils.js";
import { prompts } from "../ai/prompt.js";
import { OPENAI_CHAT_CLIENT, createLLMChain } from "../ai/llm.js";
import { LLMChain } from "langchain/chains";

const options = typedKeys(prompts).map((key) => ({
  name: prompts[key].name,
  value: key,
}));

export async function run() {
  const res = await inquirer.prompt([
    {
      type: "list",
      name: "selectedOption",
      message: chalk.blue("What type of ai assistance do you want?"),
      choices: options,
      prefix: chalk.blue("🤖"),
    },
  ]);

  const chain = createLLMChain(res.selectedOption, {
    verbose: true,
  });

  while (true) {
    try {
      const answer = await inquirer.prompt([
        {
          type: "editor",
          name: "prompt",
          message: "What is your prompt?",
        },
      ]);

      const res = await chain.call({
        prompt: answer.prompt,
      });

      console.log(res.text);
    } catch (error) {
      console.error("An error occurred:", error);
      break;
    }
  }
}
