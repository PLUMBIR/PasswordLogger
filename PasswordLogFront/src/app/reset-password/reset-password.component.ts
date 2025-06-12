import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule, NzInputOtpComponent } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { API_URL } from '../constants/URL';
import { NzFlexDirective } from 'ng-zorro-antd/flex';
import { AuthService } from '../services/auth.service';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-reset-password',
  imports: [
    ReactiveFormsModule, 
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    NzFlexDirective,
    NzInputOtpComponent,
    NzIconModule
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})

export class ResetPasswordComponent {
  private nzmodalref = inject(NzModalRef);
  private fb = inject(NonNullableFormBuilder);
  passwordVisible$ = signal<boolean>(false);
  confirmPasswordVisible$ = signal<boolean>(false);
  authService = inject(AuthService);

  user = this.authService.user$();

  currentStep: number = 1;

  email: string = '';
  verificationCode: string = '';

  constructor(
    private message: NzMessageService,
    private http: HttpClient
  ) {}

  emailForm = new FormGroup({
    email: this.fb.control<string>('', [Validators.required, Validators.email]),
  });

  codeForm = new FormGroup({
    code: this.fb.control<string>('', [Validators.required]),
  });

  passwordForm = new FormGroup({
    password: this.fb.control<string>('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: this.fb.control<string>('', [Validators.required, this.confirmValidator()]),
  });

  confirmValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return { error: true, required: true };
      } else if (control.value !== this.passwordForm.value.password) {
        return { confirm: true, error: true };
      }
      return null;
    };
  }

  submitEmail() {
    if (this.emailForm.invalid) {
      this.message.error('Пожалуйста, введите корректный email');
      return;
    }
    const email = this.emailForm.value.email!;
    this.http.post(`${API_URL}/user/send-reset-code`, { email } ).subscribe(
      (res) => {
        this.verificationCode = res.toString();
        this.email = email;
        this.currentStep = 2;
      },
      () => {
        this.message.error('Ошибка при отправке кода. Попробуйте еще раз.');
      }
    );
  }

  submitCode() {
    if (this.codeForm.invalid) {
      this.message.error('Пожалуйста, введите код');
      return;
    }
    const code = this.codeForm.value.code!;
    if (code === this.verificationCode) {
      this.currentStep = 3;
    } else {
      this.message.error('Неверный код.');
    }
  }

  submitNewPassword() {
    if (this.passwordForm.invalid) {
      this.message.error('Введите пароль.');
      return;
    }

    const payload = {
      email: this.email,
      newPassword: this.passwordForm.value.password,
      notes: ''
    };

    this.http.post(`${API_URL}/user/change-password`, payload).subscribe(
      (response) => {
        this.message.success(`Пароль успешно обновлен.`);
        this.nzmodalref.close();
      },
      (error) => {
        this.message.error('При обновлении пароля произогла ошибка.');
      }
    );
  }

  static factory() {
      const nzModalService = inject(NzModalService);
  
      return () => {
        nzModalService.create({
          nzContent: ResetPasswordComponent,
          nzMaskClosable: true,
          nzCentered: true,
          nzWidth: 700,
          nzFooter: null,
          nzBodyStyle: {
            'padding': '0'
          }
        });
      };
    }  
}
