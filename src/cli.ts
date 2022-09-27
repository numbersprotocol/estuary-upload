import { Estuary } from './index.js';
import fs from 'fs';

const args = process.argv.slice(2);
if (args.length !== 1) {
  console.log(
    'Require target directory path argument. Example: npm run add-dir <dirpath>. Aborting.'
  );
  process.exit();
}

const dirpath = args[0];
const files = await fs.promises.readdir(dirpath);
const apiKey = `${process.env.ESTUARY_API_KEY}`;
const estuary = new Estuary(apiKey);
const cids = await Promise.all(
  files.map((file) => estuary.addFromPath(`${dirpath}/${file}`))
);
console.log(cids);
