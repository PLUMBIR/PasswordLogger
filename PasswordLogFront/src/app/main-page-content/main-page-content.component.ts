import { AuthService } from '../services/auth.service';
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
import { PasswordGeneratorModalComponent } from './components/password-generator.component';
import { CardStoreService } from '../services/card.service';
import { Router } from '@angular/router';
import { UserProfileComponent } from '../user-profile/user-profile.component';

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
  private userProfileFactory = UserProfileComponent.factory();

  cardStore = inject(CardStoreService);
  authService = inject(AuthService);
  router: Router = inject(Router);
  
  userEmail$ = signal<string>(this.authService.user$()?.email!);
  isCollapsed$ = signal<boolean>(false);
  userAvatar$ = computed(() => {
    if (this.authService.user$()?.avatar) {
      return this.authService.user$()?.avatar;
    }

    return "user-avatar.png";
  });

  typehead$ = signal<string>('');
  selectedType$ = signal<string | null>(null);
  sortOption$ = signal<string>('имени a-z');
  userSelectFolder$ = signal<string>('');
  userFolders$ = computed(() => {
    const allCards = this.cardStore.allCardsViewModel$() ?? [];
    const uniqueFolders = new Set(allCards.map(card => card.folder).filter(folder => folder));
    return ["Без папки", ...Array.from(uniqueFolders)];
  });

  filteredCards$ = computed(() => {
    const query = this.typehead$().toLowerCase().trim();
    const type = this.selectedType$();
    const sortOption = this.sortOption$();
    const selectedFolder = this.userSelectFolder$();

    let cards = this.cardStore.allCardsViewModel$()
      .filter((card) => (!type || card.type === type))
      .filter((card) => (!query || card.name.toLowerCase().includes(query)))
      .filter((card) => (selectedFolder === "Без папки" ? true : !selectedFolder || card.folder === selectedFolder)); 

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

  selectFolder(folder: string) {
    this.userSelectFolder$.set(folder);
  }

  openExtensionChrome() {
    window.open("https://drive.google.com/drive/folders/1KtUrgMko5Pk4-Dsi-LuXnvDZGfDQAM69?usp=drive_link", "_blank");
  }

  logOut() {
    this.authService.logOut();
  }

  openUserProfile() {
    this.userProfileFactory();
  }
}

