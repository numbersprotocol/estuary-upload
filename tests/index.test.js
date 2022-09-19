import { Estuary } from 'estuary-upload';

/* 
 * Note:
 * 1. Set ESTUARY_API_KEY env var and run ./get-test-image.sh before running the test to get data for testing.
 * 2. The tests depends on external API (Estuary upload endpoint).
 */
describe('Test Estuary upload', () => {
    test('Can upload CAR file to Estuary and preserve CID', async () => {
        const estuary = new Estuary(process.env.ESTUARY_API_KEY)
        const resp = await estuary.add('nft-x3yrqla.png')
        console.log(resp.data)
        expect(resp.data.cid).toBe('bafybeiahygguo43ygbilfwjlhvdrlwxxkknvxanhldil5cqp47jx3yrqla');
    }, 30000);
});
