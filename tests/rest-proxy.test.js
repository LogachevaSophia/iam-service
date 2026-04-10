/**
 * REST proxy: IAM + Clinrec (klin_recommendation).
 */
const { createRestProxyApp, CLINREC_BASE } = require('../rest-proxy.js');

describe('rest-proxy', () => {
  it('exports createRestProxyApp and clinrec base URL', () => {
    expect(typeof createRestProxyApp).toBe('function');
    expect(String(CLINREC_BASE)).toMatch(/^https?:\/\//);
  });

  it('creates an Express application', () => {
    const app = createRestProxyApp();
    expect(typeof app.use).toBe('function');
    expect(typeof app.get).toBe('function');
    expect(typeof app.post).toBe('function');
  });
});
