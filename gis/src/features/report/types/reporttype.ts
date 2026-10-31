
export type ReportResponse = {
    request: number;
    responseOk: number;
    responseNOk: number;
    serviceName?: string;
    appName?: string;
    unitName?: string;
    successRate: number;
    failureRate: number;
}

export type ReportRequest = {
    environment: string;
    unitId?: number;
    serviceId?: number;
    appId?: number;
    fromDate?: string;
    toDate?: string;
    fromQuarter?: number;
    toQuarter?: number;
    fromMonth?: number;
    toMonth?: number;
    year?: number;

};