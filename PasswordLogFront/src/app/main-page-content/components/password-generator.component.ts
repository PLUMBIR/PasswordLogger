import { PasswordCardModel } from './../../models/Cards/PasswordCardModel';
import { UserService } from './../../services/user.service';
import { Component, ChangeDetectionStrategy, inject, Input, OnInit, signal, ElementRef, Signal, ViewChild } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzDividerModule } from "ng-zorro-antd/divider";
import { NzDropDownModule } from "ng-zorro-antd/dropdown";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { NzMenuModule } from "ng-zorro-antd/menu";
import { NZ_MODAL_DATA, NzModalModule, NzModalRef, NzModalService } from "ng-zorro-antd/modal";
import { AuthService } from '../../services/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzProgressModule } from 'ng-zorro-antd/progress';

@Component({
   selector: 'password-generator-modal',
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
       FormsModule, 
       NzSliderModule,
       NzSwitchModule,
       NzCheckboxModule,
       NzProgressModule
   ],
   template: `
      <div class="password-generator-container">
      <h1>Генератор пароля</h1>

      <div class="password-display">
        <span class="password-text">{{passwordText$()}}</span>
        <button class="copy-btn" (click)="copyPassword()">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
            />
          </svg>
        </button>
      </div>

      <div class="strength-text">{{strengthText$()}}</div>

      <nz-progress [nzPercent]="50" [nzShowInfo]="false"></nz-progress>

      <div class="password-options">
        <div class="option-item">
            <label for="lengthSlider">Длина пароля: </label>
        </div>

        <nz-slider [ngModel]="passwordLength$()" (ngModelChange)="passwordLength$.set($event)" [nzMin]="1" [nzMax]="32"></nz-slider>


        <div class="option-item">
          <label nz-checkbox [ngModel]="uppercaseCheck$()" (ngModelChange)="uppercaseCheck$.set($event)">Включить заглавные буквы</label>
        </div>

        <div class="option-item">
          <label nz-checkbox [ngModel]="lowercaseCheck$()" (ngModelChange)="lowercaseCheck$.set($event)">Включить строчные буквы</label>
        </div>

        <div class="option-item">
          <label nz-checkbox [ngModel]="numbersCheck$()" (ngModelChange)="numbersCheck$.set($event)">Включить цифры</label>
        </div>

        <div class="option-item">
          <label nz-checkbox [ngModel]="symbolsCheck$()" (ngModelChange)="symbolsCheck$.set($event)">Включить символы</label>
        </div>
      </div>

      <button class="generate-btn" (click)="generatePassword()">Сгенерировать пароль</button>
    </div>
        
   `,
   styles: [`
   .password-generator-container {
        background-color: #fff;
        padding: 30px;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        width: 100%;
    }

    h1 {
        text-align: center;
        color: #333;
        margin-bottom: 24px;
        font-size: 32px;
    }

    .password-options {
        margin-bottom: 25px;
    }

    .option-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
    }

    .option-item label {
        font-size: 16px;
        color: #555;
    }


    .password-display {
        background-color: #f7f7f7;
        padding: 15px;
        border: 1px solid #ddd;
        border-radius: 6px;
        margin-bottom: 20px;
        display: flex;
        gap: 10px;
        justify-content: space-between;
        align-items: center;
        position: relative;
    }

    .password-text {
        font-family: monospace;
        font-size: 18px;
        color: #333;
    }

    .copy-btn {
        background-color: transparent;
        border: none;
        cursor: pointer;
    }

    .copy-btn svg {
        width: 20px;
        height: 20px;
    }

    .strength-text {
        text-align: right;
        font-weight: bold;
        margin-bottom: 5px;
        font-size: 14px;
    }

    .generate-btn {
        width: 100%;
        padding: 15px;
        background-color: #1890ff;
        color: #fff;
        border-radius: 6px;
        border: none;
        font-size: 16px;
        cursor: pointer;
        font-weight: bold;
        transition: background-color 0.3s;
    }

    .generate-btn:hover {
        background-color: #114677;
    }

    `],
   changeDetection: ChangeDetectionStrategy.OnPush,
 })

export class PasswordGeneratorModalComponent { 
    private nzmodalref = inject(NzModalRef);
    passwordText$ = signal<string>('');
    strengthText$ = signal<string>('');
    passwordLength$ = signal<number>(12);
    uppercaseCheck$ = signal<boolean>(true);
    lowercaseCheck$ = signal<boolean>(true);
    numbersCheck$ = signal<boolean>(true);
    symbolsCheck$ = signal<boolean>(true);

    constructor(
        private readonly userService: UserService,
        private message: NzMessageService
    ) {}

    copyPassword() {
        navigator.clipboard.writeText(this.passwordText$()).then(() => {
            this.message.success("Пароль скопирован!");
        })
    }

    generatePassword() {
        const command = {
            length: this.passwordLength$(),
            includeUppercase: this.uppercaseCheck$(),
            includeLowercase: this.lowercaseCheck$(),
            includeNumbers: this.numbersCheck$(),
            includeSymbols: this.symbolsCheck$()
        };

        if (!command.includeUppercase && !command.includeLowercase && !command.includeNumbers && !command.includeSymbols) {
            this.message.error("Выберите хотя бы один тип символов для пароля!");
            return;
        }

        this.userService.generatePassword(command).subscribe({
            next: (result) => {
                this.passwordText$.set(result as string);
            }
        });
    }

    static factory() {
        const nzModalService = inject(NzModalService);
    
        return (card?: PasswordCardModel) => {
            nzModalService.create({
            nzContent: PasswordGeneratorModalComponent,
            nzCentered: true,
            nzMaskClosable: true,
            nzFooter: null,
            nzBodyStyle: {
                'padding': '0'
            }
            });
        };
    }
}