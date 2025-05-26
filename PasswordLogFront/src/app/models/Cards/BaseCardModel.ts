export type CardType = 
'password'
| 'note'
| 'address'
| 'creditCard'
| 'bankAccount';

export interface BaseCardModel {
    id: string
    name: string;
    folder?: string;
    url?: string;
    username?: string;
    password?: string;
    title?: string;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    address1?: string;
    address2?: string;
    address3?: string;
    cityOrTown?: string;
    mobilePhone?: string;
    bankName?: string; 
    accountNumber?: string;
    SWIFTCode?: string;
    IBANNumber?: string;
    PIN?: number; 
    branchPhone?: string;
    nameOnCard?: string;
    number?: number;
    securityCode?: number;
    startDate?: string;
    expirationDate?: string;
    text?: string;
    type: CardType;
    notes?: string;
}