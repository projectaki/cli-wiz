import * as p from "@clack/prompts";
import { setTimeout } from "node:timers/promises";
import color from "picocolors";

import { typedKeys } from "../utils.js";
import { prompts } from "../ai/prompt.js";
import { createLLMChain } from "../ai/llm.js";

import util from "util";
import { exec } from "child_process";

const execPromise = util.promisify(exec);

const options = typedKeys(prompts).map((key) => ({
  label: prompts[key].name,
  value: key,
}));

export async function run() {
  try {
    const select = await p.select({ message: "Select a prompt", options });

    const chain = createLLMChain(select as any, {
      verbose: false,
    });

    const answer = await p.text({
      message: color.green("Whats your question?"),
    });

    const res = await chain.call({
      prompt: answer as string,
    });
  } catch (error) {
    console.error("An error occurred:", error);
  }
}
