import * as fs from 'fs';
import * as stream from 'stream';
import { Estuary } from '../src/index';
import axios from 'axios';
import { promisify } from 'util';

async function downloadFile(url: string, path: string) {
    const writer = fs.createWriteStream(path);
    return axios({
      method: 'get',
      url: url,
      responseType: 'stream',
    }).then(response => {
      response.data.pipe(writer);
      return promisify(stream.finished)(writer);
    });
}

async function deleteFile(path: string) {
  return fs.promises.unlink(path)
}

/**
 * Integration upload tests
 * 
 * Note:
 * 1. Set ESTUARY_API_KEY env var for testing.
 * 2. The tests depends on external API (Estuary upload endpoint).
 *
 * @group integration/upload
 */
describe('Test Estuary upload', () => {
  const testFileUrl = 'https://dweb.link/ipfs/bafybeiahygguo43ygbilfwjlhvdrlwxxkknvxanhldil5cqp47jx3yrqla';
  const testFileName = 'nft-x3yrqla.png';

  beforeAll(() => {
    return downloadFile(testFileUrl, testFileName);
  }, 120000);

  test('Can upload CAR file to Estuary and preserve CID', async () => {
    const apiKey = `${process.env.ESTUARY_API_KEY}`;
    const estuary = new Estuary(apiKey);
    const cid = await estuary.addFromPath('nft-x3yrqla.png');
    console.log(cid);
    expect(cid).toBe(
      'bafybeiahygguo43ygbilfwjlhvdrlwxxkknvxanhldil5cqp47jx3yrqla'
    );
  }, 120000);

  afterAll(() => {
    return deleteFile(testFileName);
  }, 10000);
});
