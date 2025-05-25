import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NZ_MODAL_DATA, NzModalModule, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { AbstractControl, FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { Observable, Observer } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

export interface SignUpFormGroup {
  email: FormControl<string>;
  password: FormControl<string>;
  confirm: FormControl<string>;
  reminder: FormControl<string>;
}

@Component({
  selector: 'sign-up-modal',
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
    ReactiveFormsModule,
  ],
  template: `
    <div class="modal-title">
      <h2>Создать аккаунт</h2>
      <p>или <a href="">Войти</a></p>
    </div>
    <nz-divider></nz-divider>
    <form nz-form [formGroup]="form" (ngSubmit)="onSubmit()">
      <nz-form-item>
        <nz-form-control nzHasFeedback nzValidatingTip="Проверка..." [nzErrorTip]="emailErrorTpl">
          <input nz-input formControlName="email" placeholder="Электронная почта" type="email" />
          <ng-template #emailErrorTpl let-control>
            @if (control.errors?.['email']) { Неверная электронная почта! }
            @if (control.errors?.['required']) { Пожалуйста введите электронную почту! }
          </ng-template>
        </nz-form-control>
      </nz-form-item>

      <nz-form-item>
        <nz-form-control nzHasFeedback nzErrorTip="Пожалуйста введите мастер пароль!">
          <input nz-input type="password" formControlName="password" placeholder="Мастер пароль" />
        </nz-form-control>
      </nz-form-item>

      <nz-form-item>
        <nz-form-control nzHasFeedback [nzErrorTip]="passwordErrorTpl">
          <input nz-input type="password" formControlName="confirm" placeholder="Подтвердите ваш мастер пароль" />
          <ng-template #passwordErrorTpl let-control>
            @if (control.errors?.['required']) { Пожалуйста подтвердите мастер пароль! }
            @if (control.errors?.['confirm']) { Пароли не совпадают! }
          </ng-template>
        </nz-form-control>
      </nz-form-item>

      <nz-form-item class="last-form-item">
        <nz-form-control>
          <input nz-input type="text" formControlName="reminder" placeholder="Напоминание (необязательно)" />
        </nz-form-control>
      </nz-form-item>
    </form>

    <div *nzModalFooter>
      <button class="modal-btn" [disabled]="this.form.invalid" (click)="onSubmit()">Зарегистрироваться</button>
    </div>
  `,
  styles: [
    `
      ::ng-deep .ant-modal-content {
        border-radius: 14px;
      }

      .modal-title { 
        display: flex; 
        justify-content: space-between; 
        align-items: baseline; 

        h2 { 
            color: #506175; 
            font-size: 28px; 
            margin: 0; 
            font-weight: 500; 
            line-height: 1.2; 
            font-family: 'Gibson', 'Open Sans', 'Helvetica', Arial, sans-serif; 
        } 

        p { 
            color: #506175; 
            margin: 0; 
            margin-right: 32px; 
            font-size: 16px; 
            font-weight: 500; 
            line-height: 1.2; 
            font-family: 'Gibson', 'Open Sans', 'Helvetica', Arial, sans-serif; 
        } 

        a { 
            color: #00a3e0; 
        } 
      } 

      .modal-title a:hover { 
        color: #23527c; 
        text-decoration: underline; 
      }
      
      nz-divider {
        margin: 18px 0;
      }

      .last-form-item {
        margin-bottom: 0;
      }

      ::ng-deep .ant-modal-footer { 
        max-width: 450px; 
        margin: 0 auto; 
        padding: 10px 0px; 
      }

      .modal-btn {
        position: relative;
        width: 100%;
        max-width: 450px;
        margin: 10px auto;
        min-height: 50px;
        font-size: 22px;
        color: #fff;
        background-color: #d32d27;
        border: 0;
        border-radius: 30px;
        box-shadow: 0 1px 4px 0 rgba(0, 0, 0, .2);
        font-family: 'Gibson', 'Open Sans', 'Helvetica', Arial, sans-serif;
        cursor: pointer;
      }

      input {
        width: 100%;
        height: 50px;
        border: solid 1px #c3cbcb;
        border-radius: 5px;
        font-family: 'Gibson', 'Open Sans', 'Helvetica', Arial, sans-serif;
        font-size: 16px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpModalComponent {
  router: Router = inject(Router);
  private nzmodalref = inject(NzModalRef);
  private fb = inject(NonNullableFormBuilder);

  constructor(private readonly authService: AuthService) {}

  form = new FormGroup<SignUpFormGroup>({
    email: this.fb.control<string>('', [Validators.email, Validators.required], [this.emailAsyncValidator]),
    password: this.fb.control<string>('', [Validators.required]),
    confirm: this.fb.control<string>('', [this.confirmValidator()]),
    reminder: this.fb.control<string>(''),
  });

  get formValues() {
    return this.form.value;
  }

  emailAsyncValidator(control: AbstractControl): Observable<ValidationErrors | null> {
    return new Observable((observer: Observer<ValidationErrors | null>) => {
      setTimeout(() => {
        observer.next(null);
        observer.complete();
      }, 1000);
    });
  }

  confirmValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return { error: true, required: true };
      } else if (control.value !== this.form.value.password) {
        return { confirm: true, error: true };
      }
      return null;
    };
  }

  static factory() {
    const nzModalService = inject(NzModalService);

    return () => {
      nzModalService.create({
        nzContent: SignUpModalComponent,
        nzMaskClosable: true,
        nzWidth: 550,
        nzBodyStyle: { padding: '35px 50px' }
      });
    };
  }

  onSubmit() {
    const data = this.formValues;

    const command = {
      email: data.email!,
      masterPassword: data.password!,
      reminder: data.reminder!,
    };

    this.authService.signUp(command).subscribe((result) => {
      if (result) {
        this.nzmodalref.close();
        this.router.navigate(['/profile']);
      }
    });
  }
}
