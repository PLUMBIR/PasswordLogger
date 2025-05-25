import { AuthService } from './../services/auth.service';
import { UserService } from './../services/user.service';
import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzFloatButtonModule } from 'ng-zorro-antd/float-button';
import { AllItemsModalComponent } from './components/all-items.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { PasswordCardComponent } from "./components/cards/passworCard.component";
import { PasswordCardModel } from '../models/PasswordCardModel';
import { HttpClient } from '@angular/common/http';

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
    PasswordCardComponent
],
  templateUrl: './main-page-content.component.html',
  styleUrl: './main-page-content.component.scss'
})

export class MainPageContentComponent implements OnInit {
  private allItemsModalComponentFactory = AllItemsModalComponent.factory();
  isCollapsed = false;
  passwordCards$ = signal<PasswordCardModel[]>([]);
  

  userService = inject(UserService);
  authService = inject(AuthService);

  constructor(private readonly http: HttpClient) {
    effect(() => {
      this.getPasswordCards();
    });
  }

  ngOnInit(): void {
    this.getPasswordCards();
  }

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
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
}
