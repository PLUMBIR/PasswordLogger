import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from '../footer/footer.component';
import { FormControl, FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { HttpClient } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd/message';
import { API_URL } from '../constants/URL';

export interface SupportModel {
  name: FormControl<string>;
  email: FormControl<string>;
  number: FormControl<string>;
  offers: FormControl<string>;
}

@Component({
  selector: 'app-support-page',
  imports: [
    HeaderComponent,
    FooterComponent,
    ReactiveFormsModule,
    NzFormModule, 
    NzInputModule,
    NzIconModule,
    FormsModule
  ],
  templateUrl: './support-page.component.html',
  styleUrl: './support-page.component.scss'
})

export class SupportPageComponent {
  inputValue: string | null = null;

  private fb = inject(NonNullableFormBuilder);

  constructor(
    private message: NzMessageService,
    private http: HttpClient
  ) {}

  form = new FormGroup<SupportModel>({
    name: this.fb.control<string>('', [Validators.required]),
    email: this.fb.control<string>('', [Validators.required]),
    number: this.fb.control<string>('', []),
    offers: this.fb.control<string>('', [Validators.required]),
  });

  sendSupportMessage() {
    if (this.form.invalid) {
      this.message.error('Пожалуйста, заполните поля.');
      return;
    }

    const command = {
      name: this.form.value.name!,
      email: this.form.value.email!,
      number: this.form.value.number,
      offers: this.form.value.offers!
    }
    
    this.http.post(`${API_URL}/user/send-user-message`, command ).subscribe(
      (res) => {
        this.form.reset();
        this.message.success("Сообщение успешно отправлено.");
      },
      () => {
        this.message.error('Ошибка при отправке сообщения. Попробуйте еще раз.');
      }
    );
  }
}
