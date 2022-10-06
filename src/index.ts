import { packToBlob } from 'ipfs-car/pack/blob';
import { MemoryBlockStore } from 'ipfs-car/blockstore/memory';
import axios, { AxiosInstance } from 'axios';
import fs from 'fs';

export class Estuary {
  authToken: string;
  client: AxiosInstance;
  constructor(authToken: string, baseUrl = 'https://upload.estuary.tech') {
    this.authToken = authToken;
    this.client = axios.create({
      baseURL: baseUrl,
    });
    this.client.defaults.headers.common['Accept'] = 'application/json';
    this.client.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${authToken}`;
    this.client.defaults.maxContentLength = Infinity;
    this.client.defaults.maxBodyLength = Infinity;
  }

  async addFromBuffer(buffer: ArrayBuffer | Uint8Array): Promise<string> {
    const car = await packToBlob({
      input: [buffer],
      blockstore: new MemoryBlockStore(),
      wrapWithDirectory: false,
      maxChunkSize: 262144,
    }).then((ret) => ret.car);
    return this.client
      .post('/content/add-car', new Uint8Array(await car.arrayBuffer()))
      .then((resp) => resp.data.cid);
  }

  async addFromCid(cid: string): Promise<string> {
    return this.client
      .post('https://api.estuary.tech/content/add-ipfs', {root: cid})
      .then((resp) => resp.data.pin.cid);
  }

  async addFromPath(path: string): Promise<string> {
    const content = new Uint8Array(await fs.promises.readFile(path));
    return this.addFromBuffer(content);
  }
}
