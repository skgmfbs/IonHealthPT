export interface HealthCareDataProvider {
    isAvailable(): Promise<boolean>;
    getSupportedDataType(): string[];
    requestAuthorization(dataTypes: string[]): Promise<any>;
    query(queryOptions: HealthCareOptions): Promise<any>;
}
export interface HealthCareOptions {
    startDate: Date;
    endDate: Date;
    dataType: string;
}