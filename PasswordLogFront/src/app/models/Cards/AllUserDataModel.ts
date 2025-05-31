import { AddressCardModel } from "./AddressCardModel";
import { BankAccountCardModel } from "./BankAccountCardModel";
import { NoteCardModel } from "./NoteCardModel";
import { PasswordCardModel } from "./PasswordCardModel";
import { PaymentCardModel } from "./PaymentCardModel";

export interface AllUserDataModel {
    passwords: PasswordCardModel[];
    notes: NoteCardModel[];
    addresses: AddressCardModel[];
    creditCards: PaymentCardModel[];
    bankAccounts: BankAccountCardModel[];
}
