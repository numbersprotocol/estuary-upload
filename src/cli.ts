import { Estuary } from './index.js';
import fs from 'fs';
import { Command, Option, OptionValues } from 'commander';
import { version } from '../package.json';

async function addDir(dirpath: string, options: OptionValues, command: Command) {
  const files = await fs.promises.readdir(dirpath);
  await addFiles(files.map((file) => `${dirpath}/${file}`), options, command);
}

async function addFiles(files: Array<string>, options: OptionValues, command: Command) {
  const apiKey = command.optsWithGlobals().key;
  const estuary = new Estuary(apiKey);
  const cids = await Promise.all(
    files.map((file) => estuary.addFromPath(file))
  );
  console.log(cids);
}

async function main() {
  const program = new Command('estuary-upload')
    .version(version)
    .addOption(
      new Option('-k, --key <key>', 'Estuary API key')
        .env('ESTUARY_API_KEY')
        .makeOptionMandatory(true)
    );
  program.command('add-dir')
    .argument('<dir>')
    .description('Add files in a directory.')
    .action(addDir);
  program.command('add-files')
    .argument('<files...>')
    .description('Add files.')
    .action(addFiles);
  await program.parseAsync(process.argv);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
