/**
 * Types aligned with Clinrec Backend Swagger (api.* definitions).
 * Spec: openapi/clinrec-doc.json
 */
export interface ClinrecCoordinates {
    x?: number;
    y?: number;
}
export interface ClinrecData {
    label?: string;
}
export interface ClinrecEdge {
    id?: number;
    source?: number;
    target?: number;
    data?: {
        type?: string;
        value?: boolean;
    };
}
export interface ClinrecNode {
    id?: number;
    type?: number;
    data?: ClinrecData;
    json_data?: ClinrecCoordinates;
    /** Pointer-style field for null support on backend */
    subprocess_id?: string;
}
export interface ClinrecProcess {
    process_id?: string;
    name?: string;
    nodes?: ClinrecNode[];
    edges?: ClinrecEdge[];
}
export interface ClinrecErrorResponse {
    message?: string;
}
//# sourceMappingURL=clinrec.d.ts.map