"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClinrecClient = exports.ClinrecApiError = void 0;
const config_1 = require("../config");
class ClinrecApiError extends Error {
    constructor(message, statusCode, errorBody) {
        super(message);
        this.statusCode = statusCode;
        this.errorBody = errorBody;
        this.name = 'ClinrecApiError';
        Object.setPrototypeOf(this, ClinrecApiError.prototype);
    }
}
exports.ClinrecApiError = ClinrecApiError;
function trimBaseUrl(url) {
    return url.replace(/\/+$/, '');
}
async function readErrorBody(res) {
    try {
        const text = await res.text();
        if (!text)
            return undefined;
        return JSON.parse(text);
    }
    catch {
        return undefined;
    }
}
async function parseJson(res) {
    const text = await res.text();
    if (!text)
        return {};
    return JSON.parse(text);
}
/**
 * HTTP client for Clinrec Backend REST API (Swagger: /swagger/index.html → doc.json).
 */
class ClinrecClient {
    constructor(options = {}) {
        this.baseUrl = trimBaseUrl(options.baseUrl ?? config_1.config.clinrec.baseUrl);
        this.bearerToken = options.bearerToken ?? config_1.config.clinrec.apiToken;
        this.fetchImpl = options.fetchImpl ?? fetch;
    }
    headersForJson(extra) {
        const h = {
            Accept: 'application/json',
            ...extra,
        };
        return h;
    }
    async handleResponse(res) {
        if (res.ok) {
            return parseJson(res);
        }
        const errBody = await readErrorBody(res);
        const msg = errBody?.message ||
            `Clinrec API error: ${res.status} ${res.statusText}`;
        throw new ClinrecApiError(msg, res.status, errBody);
    }
    async getProcess(processId) {
        const url = new URL(`${this.baseUrl}/api/v1/process`);
        url.searchParams.set('id', processId);
        const res = await this.fetchImpl(url.toString(), {
            method: 'GET',
            headers: this.headersForJson(),
        });
        return this.handleResponse(res);
    }
    /**
     * Creates a process. Backend marks POST as Bearer-protected; pass token via options or CLINREC_API_TOKEN.
     */
    async createProcess(body, bearerTokenOverride) {
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
        return this.handleResponse(res);
    }
    async updateProcess(processId, body) {
        const url = `${this.baseUrl}/api/v1/process/${encodeURIComponent(processId)}`;
        const res = await this.fetchImpl(url, {
            method: 'PUT',
            headers: this.headersForJson({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(body),
        });
        if (res.ok) {
            return res.text();
        }
        const errBody = await readErrorBody(res);
        throw new ClinrecApiError(errBody?.message || `Clinrec API error: ${res.status}`, res.status, errBody);
    }
    async deleteProcess(processId) {
        const url = new URL(`${this.baseUrl}/api/v1/process`);
        url.searchParams.set('id', processId);
        const res = await this.fetchImpl(url.toString(), {
            method: 'DELETE',
            headers: this.headersForJson(),
        });
        if (res.ok) {
            return res.text();
        }
        const errBody = await readErrorBody(res);
        throw new ClinrecApiError(errBody?.message || `Clinrec API error: ${res.status}`, res.status, errBody);
    }
}
exports.ClinrecClient = ClinrecClient;
//# sourceMappingURL=clinrec-client.js.map