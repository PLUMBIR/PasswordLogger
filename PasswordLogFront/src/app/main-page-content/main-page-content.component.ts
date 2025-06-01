import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, OnInit, Signal, signal } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzFloatButtonModule } from 'ng-zorro-antd/float-button';
import { AllItemsModalComponent } from './components/all-items.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { PasswordCardComponent } from "./components/cards/passworCard.component";
import { PasswordCardModel } from '../models/Cards/PasswordCardModel';
import { BaseCardModel } from '../models/Cards/BaseCardModel';
import { NoteCardModel } from '../models/Cards/NoteCardModel';
import { AddressCardModel } from '../models/Cards/AddressCardModel';
import { PaymentCardModel } from '../models/Cards/PaymentCardModel';
import { BankAccountCardModel } from '../models/Cards/BankAccountCardModel';
import { OtherCardComponent } from "./components/cards/otherCard.component";
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzMessageService } from 'ng-zorro-antd/message';
import { PasswordModalComponent } from './components/password.component';
import { NoteModalComponent } from './components/note.component';
import { AddressModalComponent } from './components/address.component';
import { CreditCardModalComponent } from './components/card.component';
import { BankAccountModalComponent } from './components/bank.component';
import { AllUserDataModel } from '../models/Cards/AllUserDataModel';
import { PasswordGeneratorModalComponent } from './components/password-generator.component';
import { CardStoreService } from '../services/card.service';

@Component({
  selector: 'app-main-page-content',
  imports: [
    CommonModule,
    NzButtonModule,
    NzIconModule,
    NzMenuModule,
    NzToolTipModule,
    NzDividerModule,
    NzInputModule,
    NzFloatButtonModule,
    NzModalModule,
    ReactiveFormsModule,
    PasswordCardComponent,
    OtherCardComponent,
    FormsModule,
    NzDropDownModule 
],
  templateUrl: './main-page-content.component.html',
  styleUrl: './main-page-content.component.scss'
})

export class MainPageContentComponent implements OnInit {
  private passwordModalFactory = PasswordModalComponent.factory();
  private noteModalFactory = NoteModalComponent.factory();
  private addressModalFactory = AddressModalComponent.factory();
  private creditCardModalFactory = CreditCardModalComponent.factory();
  private bankAccountModalFactory = BankAccountModalComponent.factory();
  private allItemsModalFactory = AllItemsModalComponent.factory();
  private passwordGeneratorFactory = PasswordGeneratorModalComponent.factory();

  cardStore = inject(CardStoreService);
  
  userEmail$ = signal<string>(inject(AuthService).user$()?.email!);
  isCollapsed$ = signal<boolean>(false);

  typehead$ = signal<string>('');
  selectedType$ = signal<string | null>(null);
  sortOption$ = signal<string>('имени a-z');

  // allUserData$ = signal<AllUserDataModel>({
  //   passwords: [],
  //   notes: [],
  //   addresses: [],
  //   creditCards: [],
  //   bankAccounts: []
  // });

  // allCardsViewModel$ : Signal<BaseCardModel[]> = computed(() => {
  //   const data = this.allUserData$();

  //   const passwords = data.passwords.map((card) => ({
  //     ...card,
  //     type: 'password' as const,
  //   }));

  //   const notes = data.notes.map((card) => ({
  //     ...card,
  //     type: 'note' as const,
  //   }));

  //   const addresses = data.addresses.map((card) => ({
  //     ...card,
  //     type: 'address' as const,
  //   }));

  //   const creditCards = data.creditCards.map((card) => ({
  //     ...card,
  //     type: 'creditCard' as const,
  //   }));

  //   const bankAccounts = data.bankAccounts.map((card) => ({
  //     ...card,
  //     type: 'bankAccount' as const,
  //   }));

  //   return [
  //     ...passwords,
  //     ...notes,
  //     ...addresses,
  //     ...creditCards,
  //     ...bankAccounts
  //   ];
  // });

  filteredCards$ = computed(() => {
    const query = this.typehead$().toLowerCase().trim();
    const type = this.selectedType$();
    const sortOption = this.sortOption$();

    let cards = this.cardStore.allCardsViewModel$()
      .filter((card) => (!type || card.type === type))
      .filter((card) => (!query || card.name.toLowerCase().includes(query))); 

    if (sortOption === "папке a-z") {
      cards = [...cards].sort((a, b) => a.folder!.localeCompare(b.folder!));
    } else if (sortOption === "папке z-a") {
      cards = [...cards].sort((a, b) => b.folder!.localeCompare(a.folder!));
    } else if (sortOption === "имени a-z") {
      cards = [...cards].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "имени z-a") {
      cards = [...cards].sort((a, b) => b.name.localeCompare(a.name));
    }

    return cards;
  });

  changeSortOption(option: string) {
    this.sortOption$.update(value => option);
  } 

  constructor(private message: NzMessageService) {
  }

  ngOnInit(): void {
    this.cardStore.fetchAllUserData();
  }

  toggleCollapsed(): void {
    this.isCollapsed$.update((value) => !value);
  }

  showAllItemsModal() {
    switch (this.selectedType$()) {
        case 'password':
            this.passwordModalFactory();
            break;
        case 'note':
            this.noteModalFactory();
            break;
        case 'address':
            this.addressModalFactory();
            break;
        case 'creditCard':
            this.creditCardModalFactory();
            break;
        case 'bankAccount':
            this.bankAccountModalFactory();
            break;
        default:
            this.allItemsModalFactory();
            break;
    }
  }

  showPasswordGenerator() {
    this.passwordGeneratorFactory();
  }

  onDeleteCard($event: any) {
    this.cardStore.deleteCard($event.id, $event.type);
  }

  onEditCard($event: any) {
    const card = this.cardStore.allCardsViewModel$().find(o => o.id === $event.id);

    switch (card!.type) {
      case 'password':
        this.passwordModalFactory(card as PasswordCardModel);
        break;
      case 'note':
        this.noteModalFactory(card as NoteCardModel);
        break;
      case 'address':
        this.addressModalFactory(card as AddressCardModel);
        break;
      case 'creditCard':
        this.creditCardModalFactory(card as PaymentCardModel);
        break;
      case 'bankAccount':
        this.bankAccountModalFactory(card as BankAccountCardModel);
        break;
    }
  }

  // getAllUserData() {
  //   this.userService.getAllUserData(this.authService.user$()?.id!)
  //     .subscribe((items) => {
  //       this.allUserData$.set(items);
  //     });
  // }

  // onDeleteCard($event: any) {
  //   const command = {
  //     userId: this.authService.user$()?.id!,
  //     cardId: $event.id,
  //     cardType: $event.type
  //   }

  //   this.userService.deleteCardById(command)
  //     .subscribe({
  //       next: () => {
  //         this.message.success('Удалено.');
  //         this.getAllUserData();
  //       },
  //       error: () => this.message.error('Ошибка при удалении.')
  //   });
  // }

  // onEditCard($event: any) {
  //   const allCards = this.allCardsViewModel$();

  //   const card = allCards.find((o) => o.id === $event.id);

  //   switch (card!.type) {
  //     case 'password':
  //        this.passwordModalFactory(card as PasswordCardModel);
  //       break;
  //     case 'note':
  //         this.noteModalFactory(card as NoteCardModel);
  //       break;
  //     case 'address':
  //         this.addressModalFactory(card as AddressCardModel);
  //       break;
  //     case 'creditCard':
  //         this.creditCardModalFactory(card as PaymentCardModel);
  //       break;
  //     case 'bankAccount':
  //         this.bankAccountModalFactory(card as BankAccountCardModel);
  //       break;
  //   } 
  // }
}

