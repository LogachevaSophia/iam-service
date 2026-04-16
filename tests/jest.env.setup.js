/**
 * Jest loads modules that require CLINREC_BASE_URL before individual tests run.
 * Real deployments set this via .env or CI secrets — never commit hostnames.
 */
if (!process.env.CLINREC_BASE_URL || !String(process.env.CLINREC_BASE_URL).trim()) {
  process.env.CLINREC_BASE_URL = 'http://127.0.0.1:8080';
}
