import { config } from '../config';
import type {
  ClinrecErrorResponse,
  ClinrecProcess,
} from '../types/clinrec';

export class ClinrecApiError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
    public readonly errorBody?: ClinrecErrorResponse
  ) {
    super(message);
    this.name = 'ClinrecApiError';
    Object.setPrototypeOf(this, ClinrecApiError.prototype);
  }
}

export interface ClinrecClientOptions {
  baseUrl?: string;
  /** Used for endpoints that declare BearerAuth (e.g. POST /api/v1/process) */
  bearerToken?: string;
  fetchImpl?: typeof fetch;
}

function trimBaseUrl(url: string): string {
  return url.replace(/\/+$/, '');
}

async function readErrorBody(res: Response): Promise<ClinrecErrorResponse | undefined> {
  try {
    const text = await res.text();
    if (!text) return undefined;
    return JSON.parse(text) as ClinrecErrorResponse;
  } catch {
    return undefined;
  }
}

async function parseJson<T>(res: Response): Promise<T> {
  const text = await res.text();
  if (!text) return {} as T;
  return JSON.parse(text) as T;
}

/**
 * HTTP client for Clinrec Backend REST API (Swagger: /swagger/index.html → doc.json).
 */
export class ClinrecClient {
  private readonly baseUrl: string;
  private readonly bearerToken?: string;
  private readonly fetchImpl: typeof fetch;

  constructor(options: ClinrecClientOptions = {}) {
    this.baseUrl = trimBaseUrl(options.baseUrl ?? config.clinrec.baseUrl);
    this.bearerToken = options.bearerToken ?? config.clinrec.apiToken;
    this.fetchImpl = options.fetchImpl ?? fetch;
  }

  private headersForJson(extra?: Record<string, string>): Record<string, string> {
    const h: Record<string, string> = {
      Accept: 'application/json',
      ...extra,
    };
    return h;
  }

  private async handleResponse<T>(res: Response): Promise<T> {
    if (res.ok) {
      return parseJson<T>(res);
    }
    const errBody = await readErrorBody(res);
    const msg =
      errBody?.message ||
      `Clinrec API error: ${res.status} ${res.statusText}`;
    throw new ClinrecApiError(msg, res.status, errBody);
  }

  async getProcess(processId: string): Promise<ClinrecProcess> {
    const url = new URL(`${this.baseUrl}/api/v1/process`);
    url.searchParams.set('process_id', processId);
    const res = await this.fetchImpl(url.toString(), {
      method: 'GET',
      headers: this.headersForJson(),
    });
    return this.handleResponse<ClinrecProcess>(res);
  }

  /** GET /api/v1/process/all — список процессов (см. Swagger doc.json) */
  async listProcessesAll(): Promise<ClinrecProcess[]> {
    const res = await this.fetchImpl(`${this.baseUrl}/api/v1/process/all`, {
      method: 'GET',
      headers: this.headersForJson(),
    });
    const data = await this.handleResponse<unknown>(res);
    if (data == null) return [];
    if (Array.isArray(data) && data.length > 0 && Array.isArray(data[0])) {
      return data[0] as ClinrecProcess[];
    }
    return data as ClinrecProcess[];
  }

  /**
   * Creates a process. Backend marks POST as Bearer-protected; pass token via options or CLINREC_API_TOKEN.
   */
  async createProcess(
    body: ClinrecProcess,
    bearerTokenOverride?: string
  ): Promise<ClinrecProcess> {
    const token = bearerTokenOverride ?? this.bearerToken;
    const headers = this.headersForJson({
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    });
    const res = await this.fetchImpl(`${this.baseUrl}/api/v1/process`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });
    return this.handleResponse<ClinrecProcess>(res);
  }

  /**
   * PUT /api/v1/process — тело процесса (в Swagger без id в path; process_id в JSON).
   */
  async updateProcess(
    processId: string,
    body: ClinrecProcess
  ): Promise<string> {
    const payload = { ...body, process_id: body.process_id ?? processId };
    const url = `${this.baseUrl}/api/v1/process`;
    const res = await this.fetchImpl(url, {
      method: 'PUT',
      headers: this.headersForJson({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      return res.text();
    }
    const errBody = await readErrorBody(res);
    throw new ClinrecApiError(
      errBody?.message || `Clinrec API error: ${res.status}`,
      res.status,
      errBody
    );
  }

  async deleteProcess(processId: string): Promise<string> {
    const url = new URL(`${this.baseUrl}/api/v1/process`);
    url.searchParams.set('process_id', processId);
    const res = await this.fetchImpl(url.toString(), {
      method: 'DELETE',
      headers: this.headersForJson(),
    });
    if (res.ok) {
      return res.text();
    }
    const errBody = await readErrorBody(res);
    throw new ClinrecApiError(
      errBody?.message || `Clinrec API error: ${res.status}`,
      res.status,
      errBody
    );
  }
}
