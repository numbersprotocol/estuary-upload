import { Estuary } from '../src/index';

/*
 * Note:
 * 1. Set ESTUARY_API_KEY env var and run ./get-test-image.sh before running the test to get data for testing.
 * 2. The tests depends on external API (Estuary upload endpoint).
 */
describe('Test Estuary upload', () => {
  test('Can upload CAR file to Estuary and preserve CID', async () => {
    const apiKey = `${process.env.ESTUARY_API_KEY}`;
    const estuary = new Estuary(apiKey);
    const cid = await estuary.addFromPath('nft-x3yrqla.png');
    console.log(cid);
    expect(cid).toBe(
      'bafybeiahygguo43ygbilfwjlhvdrlwxxkknvxanhldil5cqp47jx3yrqla'
    );
  }, 30000);
});
