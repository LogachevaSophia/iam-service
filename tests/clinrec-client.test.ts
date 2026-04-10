import { ClinrecClient, ClinrecApiError } from '../src/clients/clinrec-client';

describe('ClinrecClient (klin_recommendation / Clinrec Backend)', () => {
  const baseUrl = 'http://clinrec.test';

  function mockResponse(status: number, body: string, contentType = 'application/json') {
    return {
      ok: status >= 200 && status < 300,
      status,
      statusText: status === 200 ? 'OK' : 'Error',
      headers: {
        get(name: string) {
          return name.toLowerCase() === 'content-type' ? contentType : null;
        },
      },
      text: async () => body,
    } as unknown as Response;
  }

  type FetchInput = Parameters<typeof fetch>[0];

  function requestUrl(input: FetchInput): string {
    if (typeof input === 'string') return input;
    if (input instanceof URL) return input.href;
    if (typeof Request !== 'undefined' && input instanceof Request) return input.url;
    return String(input);
  }

  const mockFetch =
    (handler: (url: string) => Promise<Response>): typeof fetch =>
    ((input: FetchInput) => {
      return handler(requestUrl(input));
    }) as typeof fetch;

  it('getProcess builds URL with query process_id', async () => {
    const calls: string[] = [];
    const fetchImpl = mockFetch(async (url) => {
      calls.push(url);
      return mockResponse(200, JSON.stringify({ process_id: 'abc', name: 'p' }));
    });
    const client = new ClinrecClient({ baseUrl, fetchImpl });
    const p = await client.getProcess('550e8400-e29b-41d4-a716-446655440000');
    expect(p.name).toBe('p');
    expect(calls[0]).toContain('/api/v1/process');
    expect(calls[0]).toContain('process_id=550e8400-e29b-41d4-a716-446655440000');
  });

  it('throws ClinrecApiError on HTTP error with JSON body', async () => {
    const fetchImpl = mockFetch(async () =>
      mockResponse(404, JSON.stringify({ message: 'not found' }))
    );
    const client = new ClinrecClient({ baseUrl, fetchImpl });
    await expect(client.getProcess('550e8400-e29b-41d4-a716-446655440000')).rejects.toMatchObject({
      name: 'ClinrecApiError',
      statusCode: 404,
    });
    try {
      await client.getProcess('x');
    } catch (e: unknown) {
      expect(e).toBeInstanceOf(ClinrecApiError);
      expect((e as ClinrecApiError).errorBody?.message).toBe('not found');
    }
  });

  it('createProcess sends JSON body and optional Bearer', async () => {
    let init: RequestInit | undefined;
    const fetchImpl = ((input: FetchInput, i?: RequestInit) => {
      void input;
      init = i;
      return Promise.resolve(mockResponse(200, JSON.stringify({ process_id: 'n' })));
    }) as typeof fetch;
    const client = new ClinrecClient({
      baseUrl,
      bearerToken: 'tok',
      fetchImpl,
    });
    await client.createProcess({ name: 'n1', nodes: [], edges: [] });
    expect(init?.method).toBe('POST');
    expect(init?.body).toContain('n1');
    const h = init?.headers as Record<string, string>;
    expect(h['Authorization']).toBe('Bearer tok');
  });

  it('updateProcess PUTs /api/v1/process; delete uses query process_id', async () => {
    const calls: { url: string; method: string }[] = [];
    const fetchImpl = ((input: FetchInput, init?: RequestInit) => {
      calls.push({ url: requestUrl(input), method: init?.method ?? 'GET' });
      return Promise.resolve(mockResponse(200, 'ok'));
    }) as typeof fetch;
    const client = new ClinrecClient({ baseUrl, fetchImpl });
    await client.updateProcess('550e8400-e29b-41d4-a716-446655440000', { name: 'x' });
    await client.deleteProcess('550e8400-e29b-41d4-a716-446655440000');
    expect(
      calls.some((c) => c.url === `${baseUrl}/api/v1/process` && c.method === 'PUT')
    ).toBe(true);
    expect(
      calls.some((c) => c.url.includes('process_id=550e8400') && c.method === 'DELETE')
    ).toBe(true);
  });
});
