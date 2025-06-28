export interface CreditCardModel {
    userId: string;
    name: string;
    folder?: string;
    nameOnCard: string;
    number: number;
    securityCode: number;
    startDate: string;
    expirationDate: string;
    notes?: string;
}