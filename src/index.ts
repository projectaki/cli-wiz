import inquirer from "inquirer";
import { templates } from "./templates.js";
import { typedKeys } from "./utils.js";
import chalk from "chalk";

async function main() {
  const options = typedKeys(templates).map((key) => templates[key].name);

  const res = await inquirer
    .prompt([
      {
        type: "list",
        name: "selectedOption",
        message: chalk.blue("What type of ai assistance do you want?"),
        choices: options,
        prefix: chalk.blue("🤖"),
      },
      {
        type: "input",
        name: "prompt",
        message: chalk.blue("What is your prompt?"),
      }
    ]);

    console.log(res);
}

main();