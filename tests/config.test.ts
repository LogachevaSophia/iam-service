describe('config (clinrec + iam env)', () => {
  const ORIGINAL_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...ORIGINAL_ENV };
  });

  afterAll(() => {
    process.env = ORIGINAL_ENV;
  });

  it('exposes clinrec.baseUrl with trailing slash stripped', () => {
    process.env.CLINREC_BASE_URL = 'http://example.com:9999/';
    const { config } = require('../src/config');
    expect(config.clinrec.baseUrl).toBe('http://example.com:9999');
  });

});
