export interface PaymentCardModel {
    id: string;
    name: string;
    folder: string;
    nameOnCard: string;
    number: number;
    securityCode: number;
    startDate: string;
    expirationDate: string;
    notes: string;
}