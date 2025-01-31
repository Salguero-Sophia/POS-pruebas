export interface EndPaymentRequest {
    TransactionId: string;
    ApprovalCode: string;
    ApprovedAmount: number;
}