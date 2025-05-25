export interface AddressModel {
    userId: string;
    name: string;
    folder: string;
    title: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    address1: string;
    address2?: string;
    address3?: string;
    cityOrTown: string;
    mobilePhone?: string;
    notes?: string;
}