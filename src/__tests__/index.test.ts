import '../index';

let callbackTest: undefined | (() => void);

jest.mock('../startServer', () => {
  return {
    startServer: () => {
      return Promise.resolve({
        listen: (_: any, callback: any) => {
          callbackTest = callback;
        },
      });
    },
  };
});

describe('entry point - index.ts', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('callback should be passed to provide launch message', () => {
    expect(typeof callbackTest).toBe('function');
  });
});
