import { packToBlob } from 'ipfs-car/pack/blob';
import { MemoryBlockStore } from 'ipfs-car/blockstore/memory';
import axios from 'axios';
import fsPromise from 'fs/promises';

const ESTUARY_BASE_URL = 'https://upload.estuary.tech';

export class Estuary{
  constructor(authToken) {
    this.authToken = authToken;
    this.client = axios.create({
      ...axios.defaults,
      baseURL: ESTUARY_BASE_URL
    });
    this.client.defaults.headers.common['Accept'] = 'application/json';
    this.client.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
    this.client.defaults.maxContentLength = Infinity;
    this.client.defaults.maxBodyLength = Infinity;
  }

  async add(path) {
    const content = new Uint8Array(await fsPromise.readFile(path));
    const { root, car } = await packToBlob({
      input: [content],
      blockstore: new MemoryBlockStore(),
      wrapWithDirectory: false,
      maxChunkSize: 262144,
    })
    return this.client.post('/content/add-car', new Uint8Array(await car.arrayBuffer()));
  }
}
