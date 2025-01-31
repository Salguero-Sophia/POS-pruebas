export type SummarySale = {
    name: string;
    total: number;
    code: number;
    date: string;
    detail: Detail[];
}

export type Detail = {
    name: string;
    code: number;
    total: number;
    detail: Detail[] | null;
}
