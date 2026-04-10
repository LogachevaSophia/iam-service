import type { ClinrecErrorResponse, ClinrecProcess } from '../types/clinrec';
export declare class ClinrecApiError extends Error {
    readonly statusCode: number;
    readonly errorBody?: ClinrecErrorResponse | undefined;
    constructor(message: string, statusCode: number, errorBody?: ClinrecErrorResponse | undefined);
}
export interface ClinrecClientOptions {
    baseUrl?: string;
    /** Used for endpoints that declare BearerAuth (e.g. POST /api/v1/process) */
    bearerToken?: string;
    fetchImpl?: typeof fetch;
}
/**
 * HTTP client for Clinrec Backend REST API (Swagger: /swagger/index.html → doc.json).
 */
export declare class ClinrecClient {
    private readonly baseUrl;
    private readonly bearerToken?;
    private readonly fetchImpl;
    constructor(options?: ClinrecClientOptions);
    private headersForJson;
    private handleResponse;
    getProcess(processId: string): Promise<ClinrecProcess>;
    /**
     * Creates a process. Backend marks POST as Bearer-protected; pass token via options or CLINREC_API_TOKEN.
     */
    createProcess(body: ClinrecProcess, bearerTokenOverride?: string): Promise<ClinrecProcess>;
    updateProcess(processId: string, body: ClinrecProcess): Promise<string>;
    deleteProcess(processId: string): Promise<string>;
}
//# sourceMappingURL=clinrec-client.d.ts.map