import * as fs from 'fs';
import * as path from 'path';

describe('Clinrec OpenAPI snapshot (klin_recommendation contract)', () => {
  it('openapi/clinrec-doc.json is valid JSON with process paths', () => {
    const p = path.join(__dirname, '../openapi/clinrec-doc.json');
    const raw = fs.readFileSync(p, 'utf8');
    const doc = JSON.parse(raw) as { paths?: Record<string, unknown>; swagger?: string };
    expect(doc.swagger).toBe('2.0');
    expect(doc.paths?.['/api/v1/process']).toBeDefined();
  });
});
