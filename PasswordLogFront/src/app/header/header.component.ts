import { Component, inject, OnDestroy, OnInit } from '@angular/core';
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
  private signUpModalFactory = SignUpModalComponent.factory();
  private signInModalFactory = SignInModalComponent.factory();

  showModalSignUp(): void {
    this.signUpModalFactory();
  }

  showModalSignIn(): void {
    this.signInModalFactory();
  }
}

