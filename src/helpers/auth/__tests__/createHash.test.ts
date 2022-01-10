import { createHashFromToken } from '../createHash';

describe('createHash module tests', () => {
  it('should create hash from token', () => {
    const token = 'test';
    const hash = createHashFromToken(token);

    expect(hash).toHaveLength(64);
  });
});
