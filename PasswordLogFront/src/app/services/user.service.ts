import { BankAccountModel } from './../models/BankAccountModel';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PasswordModel } from "../models/PasswordModel";
import { API_URL } from "../constants/URL";
import { NoteModel } from "../models/NoteModel";
import { AddressModel } from "../models/AddressModel";
import { CreditCardModel } from "../models/CreditCardModel";
import { DeleteCardModel } from '../models/DeleteCardModel';
import { AllUserDataModel } from '../models/Cards/AllUserDataModel';
import { PasswordGenerateModel } from '../models/passwordGenerateModel';
import { BaseCardModel } from '../models/Cards/BaseCardModel';

@Injectable({
  providedIn: 'root',
})
export class UserService { 
    constructor(private readonly http: HttpClient) {}

    addPassword(passwordModel: PasswordModel) {
      return this.http.post(`${API_URL}/user/passwords`, passwordModel);
    }

    addNote(noteModel: NoteModel) {
      return this.http.post(`${API_URL}/user/notes`, noteModel);
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

    generatePassword(passwordGenerateModel: PasswordGenerateModel) {
      return this.http.post(`${API_URL}/user/passwordgenerator`, passwordGenerateModel);
    }

    getAllUserData(userId: string) {
      return this.http.get<AllUserDataModel>(`${API_URL}/user/fulldata/${userId}`);
    }

    updateCard(baseCard: BaseCardModel) {
      console.log("обновление")
      return this.http.post(`${API_URL}/user/updateCard`, baseCard);
    }

    deleteCardById(cardModel: DeleteCardModel) {
      return this.http.delete(`${API_URL}/user/card`, {
        body: cardModel,
      });
    }
}