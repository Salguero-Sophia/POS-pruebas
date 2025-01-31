
export interface ResponseGetChecks {
    Result: Check[];
}

export interface Check {
    Amount:      number;
    CheckNumber: number;
}
