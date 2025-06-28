import { UserService } from './../services/user.service';
import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../constants/URL';

@Component({
  selector: 'app-user-profile',
  imports: [
    NzAvatarModule,
    NzButtonModule,
    NzIconModule,
    NzUploadModule,
    NzInputModule,
    NzFormModule,
    ReactiveFormsModule
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})

export class UserProfileComponent {
  private nzmodalref = inject(NzModalRef);
  private fb = inject(NonNullableFormBuilder);
  authService = inject(AuthService);
  userService = inject(UserService);

  user = this.authService.user$();
  passwordVisible$ = signal<boolean>(false);
  selectedImage$ = signal<string>('');

  constructor(
    private message: NzMessageService,
    private http: HttpClient
  ) {}

  form = new FormGroup({
    password: this.fb.control<string>('', [
      Validators.required,
      this.minLengthValidator(10),
      this.uppercaseValidator(),
      this.lowercaseValidator(),
      this.digitValidator(),
      this.specialCharValidator()
    ]),
    notes: this.fb.control<string>('', [Validators.maxLength(200)]),
  });

  ngOnInit(): void {
    if (this.user) {
      this.form.reset({
        notes: this.user.reminder,
      });

      if (!this.user.avatar) {
        this.user.avatar = 'ink.jpg';
      }
      this.selectedImage$.set(this.user.avatar);
    }
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

  changePassword() {
    Object.values(this.form.controls).forEach(control => {
      control.markAsDirty();
      control.markAsTouched();
      control.updateValueAndValidity();
    });

    if (this.form.invalid) {
        return;
    }

    const payload = {
      email: this.user?.email,
      newPassword: this.form.value.password,
      notes: this.form.value.notes,
    };

    this.http.post(`${API_URL}/user/change-password`, payload).subscribe(
      (response) => {
        this.message.success(`Пароль успешно обновлен.`);
        this.user!.reminder = this.form.value.notes!;
        localStorage.setItem('user', JSON.stringify(this.user));
      },
      (error) => {
        this.message.error('При обновлении пароля произогла ошибка.');
      }
    );
  }

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files![0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedImage$.set(e.target!.result as string);
        const userId = this.authService.user$()?.id;
        if (userId) {
          this.userService.updateAvatar(userId, e.target!.result as string).subscribe((user) => {
            this.authService.user$.set(user);
          });
        }
      };
      reader.readAsDataURL(file);
    }
  }

  static factory() {
    const nzModalService = inject(NzModalService);

    return () => {
      nzModalService.create({
        nzContent: UserProfileComponent,
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
