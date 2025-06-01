import { Injectable, signal, computed, inject, Signal } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { AllUserDataModel } from '../models/Cards/AllUserDataModel';
import { BaseCardModel, CardType } from '../models/Cards/BaseCardModel';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root'
})
export class CardStoreService {
  private userService = inject(UserService);
  private authService = inject(AuthService);

  constructor (private message: NzMessageService) {}

  allUserData$ = signal<AllUserDataModel>({
    passwords: [],
    notes: [],
    addresses: [],
    creditCards: [],
    bankAccounts: []
  });

  allCardsViewModel$ : Signal<BaseCardModel[]> = computed(() => {
      const data = this.allUserData$();
  
      const passwords = data.passwords.map((card) => ({
        ...card,
        type: 'password' as const,
      }));
  
      const notes = data.notes.map((card) => ({
        ...card,
        type: 'note' as const,
      }));
  
      const addresses = data.addresses.map((card) => ({
        ...card,
        type: 'address' as const,
      }));
  
      const creditCards = data.creditCards.map((card) => ({
        ...card,
        type: 'creditCard' as const,
      }));
  
      const bankAccounts = data.bankAccounts.map((card) => ({
        ...card,
        type: 'bankAccount' as const,
      }));
  
      return [
        ...passwords,
        ...notes,
        ...addresses,
        ...creditCards,
        ...bankAccounts
      ];
    });

  fetchAllUserData() {
    const userId = this.authService.user$()?.id!;
    this.userService.getAllUserData(userId).subscribe(data => {
      this.allUserData$.set(data);
    });
  }

  deleteCard(cardId: string, cardType: CardType) {
    const userId = this.authService.user$()?.id!;
    this.userService.deleteCardById({ userId, cardId, cardType })
        .subscribe({
        next: () => {
            this.fetchAllUserData();
            this.message.success('Карточка успешно удалена.');
        },
        error: () => {
            this.message.error('Ошибка при удалении карточки.');
        }
        });
    }
}
