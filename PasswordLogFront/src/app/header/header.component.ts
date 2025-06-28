import { Component, computed, inject, OnDestroy, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { SignUpModalComponent } from './components/sign-up-modal/sign-up-modal.component';
import { SignInModalComponent } from './components/sign-in-modal/sign-in-modal.component';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-header',
  imports: [    
    NzIconModule, 
    NzMenuModule,
    NzButtonModule,
    NzLayoutModule,
    NzDropDownModule,
    NzModalModule,
    NzDividerModule,
    NzFormModule,
    NzInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent {
  router: Router = inject(Router);

  private signUpModalFactory = SignUpModalComponent.factory();
  private signInModalFactory = SignInModalComponent.factory();

  constructor(
    private message: NzMessageService
  ) {}

  showModalSignUp(): void {
    this.signUpModalFactory();
  }

  showModalSignIn(): void {
    this.signInModalFactory();
  }

  openSupportPage() {
    this.router.navigate(['/support']);
  }

  openWelcomePage() {
    this.router.navigate(['']);
  }

  copyToClipboard(value: string): void {
    navigator.clipboard.writeText(value).then(
      () => {
        this.message.success('Скопировано в буфер обмена!');
      },
      () => {
        this.message.error('Не удалось скопировать.');
      }
    );
  }
}

