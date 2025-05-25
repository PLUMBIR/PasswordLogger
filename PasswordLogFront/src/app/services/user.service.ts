import { BankAccountModel } from './../models/BankAccountModel';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PasswordModel } from "../models/PasswordModel";
import { API_URL } from "../constants/URL";
import { NoteModel } from "../models/NoteModel";
import { AddressModel } from "../models/AddressModel";
import { PasswordCardModel } from "../models/PasswordCardModel";
import { CreditCardModel } from "../models/CreditCardModel";

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
      return this.http.get<PasswordCardModel[]>(`${API_URL}/user/passwords/${userId}`, );
    }
}