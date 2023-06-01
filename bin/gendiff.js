import { Command, Option } from "commander";
import diff from "../index.js"

const program = new Command();
program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .addOption(new Option('-f, --format <type>', 'output format')
    .choices(['stylish', 'plain', 'json']).default('stylish'))
  .action((filepath1, filepath2, option) => {
    try {
      console.log(diff(filepath1, filepath2, option.format));
    } catch (error) {
      console.log(`error: ${error.message}`);
    }
  });

program.parse();

export default program;

