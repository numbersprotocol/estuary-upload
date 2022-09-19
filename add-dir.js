import { Estuary } from './index.js';
import fsPromise from 'fs/promises';

const args = process.argv.slice(2);
if (args.length !== 1) {
    console.log('Require target directory path argument. Example: npm run add-dir <dirpath>. Aborting.');
    process.exit();
}

const dirpath = args[0];
const files = await fsPromise.readdir(dirpath);
const estuary = new Estuary(process.env.ESTUARY_API_KEY);
const resps = await Promise.all(files.map(file => estuary.add(`${dirpath}/${file}`)));
console.log(resps.map(resp => resp.data.cid));
