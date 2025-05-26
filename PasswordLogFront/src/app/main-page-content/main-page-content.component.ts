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
  userService = inject(UserService);
  authService = inject(AuthService);
  private allItemsModalComponentFactory = AllItemsModalComponent.factory();

  isCollapsed$ = signal<boolean>(false);

  passwordCards$ = signal<PasswordCardModel[]>([]);
  noteCards$ = signal<NoteCardModel[]>([]);
  addressesCards$ = signal<AddressCardModel[]>([]);
  creditCards$ = signal<PaymentCardModel[]>([]);
  bankAccountsCards$ = signal<BankAccountCardModel[]>([]);

  typehead$ = signal<string>('');
  selectedType$ = signal<string | null>(null);
  sortOption$ = signal<string>('имени a-z');

  allCards$ : Signal<BaseCardModel[]> = computed(() => [
    ...this.passwordCards$().map((card: PasswordCardModel) => ({
      ...card,
      type: 'password' as const,
    })),
    ...this.noteCards$().map((card: NoteCardModel) => ({
      ...card,
      type: 'note' as const,
    })),
    ...this.addressesCards$().map((card: AddressCardModel) => ({
      ...card,
      type: 'address' as const,
    })),
    ...this.creditCards$().map((card: PaymentCardModel) => ({
      ...card,
      type: 'creditCard' as const,
    })),
    ...this.bankAccountsCards$().map((card: BankAccountCardModel) => ({
      ...card,
      type: 'bankAccount' as const,
    }))
  ]);

  filteredCards$ = computed(() => {
    const query = this.typehead$().toLowerCase().trim();
    const type = this.selectedType$();
    const sortOption = this.sortOption$();

    let cards = this.allCards$()
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
    effect(() => {
      // this.getPasswordCards();
    });
  }

  ngOnInit(): void {
    this.getPasswordCards();
    this.getNotesCards();
    this.getAddressesCards();
    this.getCreditCards();
    this.getBankAccountsCards();
  }

  toggleCollapsed(): void {
    this.isCollapsed$.update((value) => !value);
  }

  showAllItemsModal() {
    this.allItemsModalComponentFactory()
  }

  getPasswordCards() {
    this.userService.getPasswordCards(this.authService.user$()?.id!)
      .subscribe((cards) => {
        this.passwordCards$.set(cards);
      });
  }

  getNotesCards() {
    this.userService.getNotesCards(this.authService.user$()?.id!)
      .subscribe((cards) => {
        this.noteCards$.set(cards);
      });
  }

  getAddressesCards() {
    this.userService.getAddressesCards(this.authService.user$()?.id!)
      .subscribe((cards) => {
        this.addressesCards$.set(cards);
      });
  }

  getCreditCards() {
    this.userService.getCreditCards(this.authService.user$()?.id!)
      .subscribe((cards) => {
        this.creditCards$.set(cards);
      });
  }

  getBankAccountsCards() {
    this.userService.getBankAccountsCards(this.authService.user$()?.id!)
      .subscribe((cards) => {
        this.bankAccountsCards$.set(cards);
      });
  }

  onDeleteCard($event: any) {
    const command = {
      userId: this.authService.user$()?.id!,
      cardId: $event.id,
      cardType: $event.type
    }

    this.userService.deleteCardById(command)
      .subscribe({
        next: () => {
          this.message.success('Удалено.');
          this.refreshCards();
        },
        error: () => this.message.success('Ошибка при удалении.')
      });
    }

  refreshCards() {
    this.getPasswordCards();
    this.getNotesCards();
    this.getAddressesCards();
    this.getCreditCards();
    this.getBankAccountsCards();
  }
}
