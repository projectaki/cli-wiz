import * as p from "@clack/prompts";
import color from "picocolors";
import { extractCodeBlock, typedKeys } from "../utils.js";
import { prompts } from "../ai/prompt.js";
import { createLLMChain } from "../ai/llm.js";
import util from "util";
import { exec } from "child_process";
const execPromise = util.promisify(exec);
const options = typedKeys(prompts).map((key) => ({
    label: prompts[key].label,
    value: key,
}));
export async function run() {
    try {
        const select = await p.select({ message: "Select a prompt", options });
        const chain = createLLMChain(select, {
            verbose: false,
        });
        const answer = await p.text({
            message: color.green("Whats your question?"),
        });
        const res = await chain.call({
            prompt: answer,
        });
        if (select === "cli") {
            const code = extractCodeBlock(res.text);
            const message = `${color.green("Would you like to run the following command? \n")}
      ${color.yellow(color.underline(color.bold(code)))}`;
            const confirm = await p.confirm({
                message: message
            });
            if (typeof confirm === 'boolean' && confirm && code) {
                const { stdout, stderr } = await execPromise(code);
                if (stdout)
                    p.note(stdout);
                if (stderr)
                    p.note(color.red(stderr));
            }
        }
    }
    catch (error) {
        console.error("An error occurred:", error);
    }
}
