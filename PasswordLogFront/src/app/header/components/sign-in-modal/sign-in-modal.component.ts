import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NzModalModule, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { AbstractControl, FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
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
import { NzMessageService } from 'ng-zorro-antd/message';
import { SignUpModalComponent } from '../sign-up-modal/sign-up-modal.component';
import { ResetPasswordComponent } from '../../../reset-password/reset-password.component';

export interface SignInFormGroup {
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'sign-up-modal',
  standalone: true,
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
    <div class="modal-logo">
      <span>ПАРОЛЬНИК</span>
    </div>
    <div class="modal-text">
      <h1>Войти</h1>
      <p>
        или
        <a (click)="openSignUpModal()">Зарегистрироваться</a>
      </p>
    </div>
    <nz-divider></nz-divider>
    <form nz-form [formGroup]="form" (ngSubmit)="onSubmit()">
      <nz-form-item>
        <nz-form-control
          nzHasFeedback
          nzValidatingTip="Проверка..."
          [nzErrorTip]="emailErrorTpl"
        >
          <input
            nz-input
            formControlName="email"
            placeholder="Электронная почта"
            type="email"
          />
          <ng-template #emailErrorTpl let-control>
            @if (control.errors?.['email']) { Неверная электронная почта! } @if
            (control.errors?.['required']) { Пожалуйста введите электронную
            почту! }
          </ng-template>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item class="last-form-item">
        <nz-form-control
          nzHasFeedback
          nzErrorTip="Пожалуйста введите мастер пароль!"
        >
          <input
            nz-input
            type="password"
            formControlName="password"
            placeholder="Мастер пароль"
          />
        </nz-form-control>
      </nz-form-item>
    </form>
    <div *nzModalFooter>
      <div class="modal-footer">
        <button class="modal-btn" [disabled]="this.form.invalid" (click)="onSubmit()">Войти</button>
        <div>
          <a class="forgot-password" (click)="openResetPasswordModal()">Забыли пароль?</a>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      ::ng-deep .ant-modal-content {
        border: 0;
        border-radius: 14px;
      }

      .modal-title {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
      }

      .modal-title h2 {
        color: #506175;
        font-size: 28px;
        margin: 0;
        font-weight: 500;
        line-height: 1.2;
        font-family: 'Gibson', 'Open Sans', 'Helvetica', Arial, sans-serif;
      }

      .modal-title p {
        color: #506175;
        margin: 0;
        margin-right: 32px;
        font-size: 16px;
        font-weight: 500;
        line-height: 1.2;
        font-family: 'Gibson', 'Open Sans', 'Helvetica', Arial, sans-serif;
      }

      .modal-title a {
        color: #00a3e0;
      }

      .modal-title a:hover {
        color: #23527c;
        text-decoration: underline;
      }

      nz-divider {
        margin: 18px 0px;
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
        box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2);
        font-family: 'Gibson', 'Open Sans', 'Helvetica', Arial, sans-serif;
        cursor: pointer;
      }

      .modal-logo {
        text-align: center;
      }
      
      .modal-logo span {
        color: #d71340;
        font-size: 24px;
        font-style: normal;
        font-weight: 700;
        line-height: 1.5;
        font-family: 'Source Sans 3', sans-serif;
        user-select: none;
      }

      .modal-text {
        margin-top: 21px;
        display: flex;
        justify-content: space-between;
        align-items: baseline;
      }

      .modal-text h1 {
        font-family: 'Open Sans', 'Helvetica', Arial, sans-serif;
        font-size: 21px;
        color: rgb(60, 72, 98);
      }

      .modal-text p {
        color: #506175;
        margin: 0;
        font-size: 18px;
        font-weight: 500;
        line-height: 1.2;
        font-family: 'Gibson', 'Open Sans', 'Helvetica', Arial, sans-serif;
      }

      .modal-text a {
        color: rgb(43, 123, 177);
      }

      .forgot-password {
        font-size: 16px;
        line-height: 1.4em;
        font-weight: 600;
        color: rgb(43, 123, 177);
      }

      .forgot-password:hover {
        text-decoration: underline;
      }

      .last-form-item {
        margin-bottom: 0;
      }

      .modal-footer {
        display: flex;
        flex-direction: column;

        div {
          text-align: center;
          margin-top: 10px;
          margin-bottom: 10px;
        }
      }

      input {
        width: 100%;
        height: 50px;
        background-color: #fff;
        border: solid 1px #c3cbcb;
        border-radius: 5px;
        box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.15);
        font-family: 'Gibson', 'Open Sans', 'Helvetica', Arial, sans-serif;
        font-size: 16px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInModalComponent {
  router: Router = inject(Router);
  private nzmodalref = inject(NzModalRef);
  private fb = inject(NonNullableFormBuilder);
  private signUpModalFactory = SignUpModalComponent.factory();
  private resetPasswordModalFactory = ResetPasswordComponent.factory();

  constructor(
    private readonly authService: AuthService,
    private message: NzMessageService
  ) {}

  form = new FormGroup<SignInFormGroup>({
    email: this.fb.control<string>(
      '',
      [Validators.email, Validators.required],
      [this.emailAsyncValidator]
    ),
    password: this.fb.control<string>('', [Validators.required]),
  });

  get formValues() {
    return this.form.value;
  }

  emailAsyncValidator(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    return new Observable((observer: Observer<ValidationErrors | null>) => {
      setTimeout(() => {
        observer.next(null);
        observer.complete();
      }, 1000);
    });
  }

  static factory() {
    const nzModalService = inject(NzModalService);

    return () => {
      nzModalService.create({
        nzContent: SignInModalComponent,
        nzMaskClosable: true,
        nzWidth: 550,
        nzBodyStyle: { padding: '35px 50px 35px' },
      });
    };
  }

  onSubmit() {
    const data = this.formValues;

    const command = {
      email: data.email!,
      masterPassword: data.password!,
    };

    this.authService.signIn(command).subscribe(
      (result) => {
        if (result) {
          this.nzmodalref.close();
          this.message.success('Вы успешно вошли в аккаунт.');
          this.router.navigate(['/profile']);
        }
      },
      (error) => {
        if (error.status === 400) {
          this.message.error('Неправильный логин или пароль.');
        } else {
          this.message.error('Произошла ошибка при входе. Попробуйте позже.');
        }
    });
  }

  openSignUpModal() {
    this.nzmodalref.close();
    this.signUpModalFactory();
  }

  openResetPasswordModal() {
    this.nzmodalref.close();
    this.resetPasswordModalFactory();
  }
}
