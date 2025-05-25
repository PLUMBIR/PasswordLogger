export interface BankAccountModel {
  userId: string;
  name: string;
  folder: string;
  bankName: string; 
  accountNumber: string;
  SWIFTCode?: string;
  IBANNumber?: string;
  PIN: number; 
  branchPhone: string;
  notes?: string;
}