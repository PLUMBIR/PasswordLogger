import { BankAccountModel } from './../models/BankAccountModel';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PasswordModel } from "../models/PasswordModel";
import { API_URL } from "../constants/URL";
import { NoteModel } from "../models/NoteModel";
import { AddressModel } from "../models/AddressModel";
import { PasswordCardModel } from "../models/Cards/PasswordCardModel";
import { CreditCardModel } from "../models/CreditCardModel";
import { NoteCardModel } from '../models/Cards/NoteCardModel';
import { AddressCardModel } from '../models/Cards/AddressCardModel';
import { PaymentCardModel } from '../models/Cards/PaymentCardModel';
import { BankAccountCardModel } from '../models/Cards/BankAccountCardModel';

@Injectable({
  providedIn: 'root',
})
export class UserService { 
    constructor(private readonly http: HttpClient) {}

    addPassword(passwordModel: PasswordModel) {
      return this.http.post(`${API_URL}/user/passwords`, passwordModel);
    }

    addNote(noteModel: NoteModel) {
      return this.http.post(`${API_URL}/user/note`, noteModel);
    }

    addAddress(addressModel: AddressModel) {
      return this.http.post(`${API_URL}/user/addresses`, addressModel);
    }

    addCreditCard(creditCardModel: CreditCardModel) {
      return this.http.post(`${API_URL}/user/creditCard`, creditCardModel);
    }

    addBankAccount(bankAccountModel: BankAccountModel) {
      return this.http.post(`${API_URL}/user/bankAccount`, bankAccountModel);
    }

    getPasswordCards(userId: string) {
      return this.http.get<PasswordCardModel[]>(`${API_URL}/user/passwords/${userId}`);
    }

    getNotesCards(userId: string) {
      return this.http.get<NoteCardModel[]>(`${API_URL}/user/notes/${userId}`);
    }

    getAddressesCards(userId: string) {
      return this.http.get<AddressCardModel[]>(`${API_URL}/user/addresses/${userId}`);
    }

    getCreditCards(userId: string) {
      return this.http.get<PaymentCardModel[]>(`${API_URL}/user/creditCards/${userId}`);
    }

    getBankAccountsCards(userId: string) {
      return this.http.get<BankAccountCardModel[]>(`${API_URL}/user/bankAccounts/${userId}`);
    }
}