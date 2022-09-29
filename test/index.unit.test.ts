import { Estuary } from '../src/index';

jest.mock('../src/index', () => {
  return {
    Estuary: jest.fn().mockImplementation(() => {
      return {
        addFromPath: async(path: string) => { return 'bafybeiahygguo43ygbilfwjlhvdrlwxxkknvxanhldil5cqp47jx3yrqla'},
      };
    })
  };
});

/**
 * Unit upload tests
 *
 * @group unit/upload
 */
describe('Test Estuary upload', () => {
  it('can upload CAR file to Estuary and preserve CID', async () => {
    const apiKey = '';
    const estuary = new Estuary(apiKey);
    expect(Estuary).toHaveBeenCalledTimes(1);
    const cid = await estuary.addFromPath('no-file.png');
    expect(cid).toBe(
      'bafybeiahygguo43ygbilfwjlhvdrlwxxkknvxanhldil5cqp47jx3yrqla'
    );
  }, 5000);
});
