import { packToBlob } from 'ipfs-car/pack/blob';
import { packToFs } from 'ipfs-car/pack/fs';
import { MemoryBlockStore } from 'ipfs-car/blockstore/memory';
import axios, { AxiosInstance } from 'axios';
import fs from 'fs';
import os from 'os';

export class Estuary {
  authToken: string;
  client: AxiosInstance;
  chunkSize: number;
  constructor(
    authToken: string, baseUrl = 'https://upload.estuary.tech',
    timeout = 60000, chunkSize = 262144) {
    this.authToken = authToken;
    this.client = axios.create({
      baseURL: baseUrl,
    });
    this.client.defaults.headers.common['Accept'] = 'application/json';
    this.client.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${authToken}`;
    // Add header Accept-Encoding to fix BrotliDecoder.zlibOnError in axis 1.2.1
    // https://github.com/axios/axios/issues/5346
    this.client.defaults.headers.common['Accept-Encoding'] = 'gzip,deflate,compress';
    this.client.defaults.maxContentLength = Infinity;
    this.client.defaults.maxBodyLength = Infinity;
    this.client.defaults.timeout = timeout;
    this.chunkSize = chunkSize;
  }

  async addFromBuffer(buffer: ArrayBuffer | Uint8Array): Promise<string> {
    const car = await packToBlob({
      input: [buffer],
      blockstore: new MemoryBlockStore(),
      wrapWithDirectory: false,
      maxChunkSize: this.chunkSize,
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
    const output = `${os.tmpdir()}/${Math.floor(Math.random() * 1e9)}_${Date.now()}.car`;
    await packToFs({
      input: path,
      output: output,
      wrapWithDirectory: false,
      maxChunkSize: this.chunkSize,
    });
    const inStream = fs.createReadStream(output);
    return this.client
      .post('/content/add-car', inStream)
      .then((resp) => resp.data.cid)
      .finally(() => {fs.unlinkSync(output)});
  }
}
