import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NzModalModule, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
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
import { SignInModalComponent } from '../sign-in-modal/sign-in-modal.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserService } from '../../../services/user.service';

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
      <p>или <a (click)="openSignInModal()">Войти</a></p>
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
        <nz-form-control
          nzHasFeedback
          nzErrorTip="Пожалуйста введите мастер пароль!"
          [nzErrorTip]="passwordErrorTpl"
        >
          <nz-input-group [nzSuffix]="suffixTemplatePassword">
            <input
              [type]="passwordVisible$() ? 'text' : 'password'"
              nz-input
              id="password"
              formControlName="password"
              placeholder="Мастер пароль"
            />
            <ng-template #passwordErrorTpl let-control>
              @if (control.errors?.['required']) {
                Пожалуйста введите мастер пароль!
              }
              @else if (control.errors?.['minLength']) {
                Пароль должен быть не короче {{ control.errors['minLength'].requiredLength }} символов.
              }
              @else if (control.errors?.['uppercase']) {
                Пароль должен содержать хотя бы одну заглавную букву.
              }
              @else if (control.errors?.['lowercase']) {
                Пароль должен содержать хотя бы одну строчную букву.
              }
              @else if (control.errors?.['digit']) {
                Пароль должен содержать хотя бы одну цифру.
              }
              @else if (control.errors?.['specialChar']) {
                Пароль должен содержать хотя бы один специальный символ.
              }
            </ng-template>
          </nz-input-group>
        </nz-form-control>

        <ng-template #suffixTemplatePassword>
          <nz-icon
            class="ant-input-password-icon"
            [nzType]="passwordVisible$() ? 'eye-invisible' : 'eye'"
            (click)="passwordVisible$.set(!passwordVisible$())"
          ></nz-icon>
          <nz-icon
            class="ant-input-password-icon"
            nzType="lock"
            (click)="onGeneratePassword()"
            style="margin-left: 8px; cursor: pointer;"
          ></nz-icon>
        </ng-template>

      </nz-form-item>

      <nz-form-item>
        <nz-form-control nzHasFeedback [nzErrorTip]="passwordErrorConfirmTpl">
            <nz-input-group [nzSuffix]="suffixTemplate">
                <input
                    [type]="passwordConfirmVisible$() ? 'text' : 'password'"
                    nz-input
                    formControlName="confirm"
                    id="confirmPassword"
                    placeholder="Подтвердите ваш мастер пароль"
                />
                <ng-template #passwordErrorConfirmTpl let-control>
                  @if (control.errors?.['required']) { Пожалуйста подтвердите мастер пароль! }
                  @if (control.errors?.['confirm']) { Пароли не совпадают! }
                </ng-template>
            </nz-input-group>
        </nz-form-control>

        <ng-template #suffixTemplate>
            <nz-icon
                class="ant-input-password-icon"
                [nzType]="passwordConfirmVisible$() ? 'eye-invisible' : 'eye'"
                (click)="passwordConfirmVisible$.set(!passwordConfirmVisible$())"
            />
        </ng-template>
      </nz-form-item>

      <nz-form-item class="last-form-item">
        <nz-form-control>
          <input nz-input type="text" formControlName="reminder" placeholder="Напоминание (необязательно)" />
        </nz-form-control>
      </nz-form-item>
    </form>

    <div *nzModalFooter>
      <button class="modal-btn" (click)="onSubmit()">Зарегистрироваться</button>
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

      nz-input-group {
        width: 100%;
        height: 50px;
        border: solid 1px #c3cbcb;
        border-radius: 5px;
        font-family: 'Gibson', 'Open Sans', 'Helvetica', Arial, sans-serif;
        font-size: 16px;

        input {
          height: 40px;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpModalComponent {
  router: Router = inject(Router);
  private nzmodalref = inject(NzModalRef);
  private fb = inject(NonNullableFormBuilder);
  private signInModalFactory = SignInModalComponent.factory();
  passwordVisible$ = signal<boolean>(false);
  passwordConfirmVisible$ = signal<boolean>(false);

  constructor(
    private readonly authService: AuthService,
    private readonly userService : UserService,
    private message: NzMessageService
  ) {}

  form = new FormGroup<SignUpFormGroup>({
    email: this.fb.control<string>('', [Validators.email, Validators.required], [this.emailAsyncValidator]),
    password: this.fb.control<string>('', [
      Validators.required,
      this.minLengthValidator(10),
      this.uppercaseValidator(),
      this.lowercaseValidator(),
      this.digitValidator(),
      this.specialCharValidator()
    ]),
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

  minLengthValidator(minLength: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value || '';
      return value.length >= minLength ? null : { minLength: { requiredLength: minLength } };
    };
  }

  uppercaseValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return /[A-Z]/.test(control.value) ? null : { uppercase: true };
    };
  }

  lowercaseValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return /[a-z]/.test(control.value) ? null : { lowercase: true };
    };
  }

  digitValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return /\d/.test(control.value) ? null : { digit: true };
    };
  }

  specialCharValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return /[!@#$%^&*()[\]{}\-_=+\\|;:'",.<>?/]/.test(control.value) ? null : { specialChar: true };
    };
  }

  onGeneratePassword(): void {
    const command = {
      length: 10,
      includeUppercase: true,
      includeLowercase: true,
      includeNumbers: true,
      includeSymbols: true
    };

    this.userService.generatePassword(command).subscribe({
      next: (result) => {
        this.form.get('password')?.setValue(result.toString());
        this.form.get('password')?.markAsDirty();
        this.form.get('password')?.markAsTouched();
        this.form.get('password')?.updateValueAndValidity();
      }
    });
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
    Object.values(this.form.controls).forEach(control => {
      control.markAsDirty();
      control.markAsTouched();
      control.updateValueAndValidity();
    });

    if (this.form.invalid) {
        return;
    }

    const data = this.formValues;

    const command = {
      email: data.email!,
      masterPassword: data.password!,
      reminder: data.reminder!,
    };

    this.authService.signUp(command).subscribe({
      next: (result) => {
        this.nzmodalref.close();
        this.message.success('Вы успешно зарегистрировались.');
        this.router.navigate(['/profile']);
      },
      error: (error) => {
        if (error.status === 400) {
          this.message.error('На данный email уже создан аккаунт.');
        } else {
          this.message.error('Произошла ошибка при регистрации. Попробуйте позже.');
        }
      }
    });
  }

  openSignInModal() {
    this.nzmodalref.close();
    this.signInModalFactory();
  }
}
