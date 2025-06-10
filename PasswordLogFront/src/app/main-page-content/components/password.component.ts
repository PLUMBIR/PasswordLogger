import { PasswordCardModel } from './../../models/Cards/PasswordCardModel';
import { UserService } from './../../services/user.service';
import { Component, ChangeDetectionStrategy, inject, Input, OnInit, signal } from "@angular/core";
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
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
import { AllItemsModalComponent } from './all-items.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BaseCardModel } from '../../models/Cards/BaseCardModel';
import { CardStoreService } from '../../services/card.service';

export interface PasswordFormGroup {
  url: FormControl<string>;
  name: FormControl<string>;
  folder: FormControl<string>;
  username: FormControl<string>;
  password: FormControl<string>;
  notes: FormControl<string>;
}

@Component({
   selector: 'password-modal',
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
        <div class="header-modal">
            <div class="header-modal-inner">
                <span class="header-modal-title" (click)="returnToAllItems()">
                    <nz-icon nzType="caret-left" nzTheme="outline" />
                    Все элементы
                </span>
                <span class="header-modal-logo">Добавить пароль</span>
            </div>
        </div>
        <div class="modal-content">
            <div class="modal-content-inputs">
                <form nz-form [formGroup]="form" (ngSubmit)="onSubmit()">
                    <span>URL:</span>
                    <nz-form-item>
                        <nz-form-control [nzSm]="14" [nzXs]="24" nzErrorTip="Пожалуйста, напишите URL">
                            <input nz-input id="URL" formControlName="url" placeholder="URL" />
                        </nz-form-control>
                    </nz-form-item>
                    <div class="inputs">
                        <div class="input-item" style="margin-right: 36px;">
                            <span>Имя:</span>
                            <nz-form-item>
                                <nz-form-control [nzSm]="14" [nzXs]="24" nzErrorTip="Пожалуйста, введите имя">
                                    <input nz-input id="name" formControlName="name" placeholder="Имя" />
                                </nz-form-control>
                            </nz-form-item>
                        </div>
                        <div class="input-item">
                            <span>Папка:</span>
                            <nz-form-item>
                                <nz-form-control [nzSm]="14" [nzXs]="24" nzErrorTip="Пожалуйста, укажите папку">
                                    <input nz-input id="folder" formControlName="folder" placeholder="Папка" />
                                </nz-form-control>
                            </nz-form-item>
                        </div>
                        <div class="input-item" style="margin-right: 36px;">
                            <span>Имя пользователя:</span>
                            <nz-form-item>
                                <nz-form-control [nzSm]="14" [nzXs]="24" nzErrorTip="Пожалуйста, введите имя пользователя">
                                    <input nz-input id="username" formControlName="username" placeholder="Имя пользователя" />
                                </nz-form-control>
                            </nz-form-item>
                        </div>
                        <div class="input-item">
                            <span>Пароль:</span>
                            <nz-form-item>
                                <nz-form-control [nzSm]="14" [nzXs]="24" nzErrorTip="Пожалуйста, введите пароль">
                                    <nz-input-group [nzSuffix]="suffixTemplate">
                                        <input
                                            [type]="passwordVisible$() ? 'text' : 'password'"
                                            nz-input
                                            id="password"
                                            formControlName="password"
                                            placeholder="Пароль"
                                        />
                                    </nz-input-group>
                                </nz-form-control>

                                <ng-template #suffixTemplate>
                                    <nz-icon
                                        class="ant-input-password-icon"
                                        [nzType]="passwordVisible$() ? 'eye-invisible' : 'eye'"
                                        (click)="passwordVisible$.set(!passwordVisible$())"
                                    />
                                </ng-template>
                            </nz-form-item>
                        </div>
                    </div>
                    <span>Примечания:</span>
                    <nz-form-item style="margin-bottom: 0px;">
                        <nz-form-control [nzSpan]="12" nzHasFeedback>
                            <nz-textarea-count [nzMaxCharacterCount]="200">
                                <textarea formControlName="notes" nz-input rows="2"></textarea>
                            </nz-textarea-count>
                        </nz-form-control>
                    </nz-form-item>
                </form>
            </div>
        </div>
        <div class="modal-buttons">
            <button class="cancel-btn" (click)="closeModal()">
                Отмена
            </button>
            <button class="submit-btn" [disabled]="this.form.invalid" (click)="onSubmit()">
                Сохранить
            </button>
        </div>
   `,
   styles: [`
        .header-modal {
            display: flex; 
            align-items: center; 
            justify-content: flex-start;
            background-color: #d22d27;
            color: #fff;
            font-weight: 600;
            padding-left: 20px;
            padding-right: 20px;
            height: 45px;
        }

        .header-modal-inner {
            margin-top: 7px;
        }

        .header-modal-title {
            margin-left: 10px;
            font-family: Open Sans, sans-serif;
            font-size: 14px;
            color: #fff;
            font-weight: 600;
            cursor: pointer;
        }

        .header-modal-title:hover {
            color: #e3e3e3;
        }

        .header-modal-logo {
            margin-left: 170px;
            font-size: 16px;
            font-family: Open Sans, sans-serif;
            color: #fff;
            font-weight: 600;
        }

        ::ng-deep .ant-modal-close-x {
            color: #fff;
        } 

        .modal-content {
            background-color: #f9fbfd;
            padding: 20px 20px 0 20px;
        }

        nz-form-control {
            width: 100%;
            max-width: none;
        }

        span {
            font-family: Open Sans, sans-serif;
            font-size: 16px;
            font-weight: 600;
        }

        .inputs { 
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;  
        }
        
        .input-item {
            min-width: 362px;
        }

        .modal-buttons {
            display: flex;
            justify-content: end;
            padding: 10px 16px;
            gap: 10px;
            background-color: #f9fbfd;
        }

        .cancel-btn {
            background-color: #fff;
            padding: 4px 4px 3px;
            width: 140px;
            font-size: 15px;
            line-height: 19px !important;
            font-family: Open Sans, sans-serif;
            border: none;
            border-radius: 5px;
            box-shadow: 0 1px 2px rgba(0, 0, 0, .2);
            cursor: pointer;
            color: #3b352a !important;
        }

        .cancel-btn:hover {
            background-color: #f8f8f8;
        }

        .submit-btn {
            background-color: #d32d27;
            padding: 4px 4px 3px;
            width: 140px;
            font-size: 15px;
            line-height: 19px !important;
            font-family: Open Sans, sans-serif;
            border: none;
            border-radius: 5px;
            box-shadow: 0 1px 2px rgba(0, 0, 0, .2);
            cursor: pointer;
            color: #fff !important;
        }

        .submit-btn:hover {
            background-color: #af0806;
        }
    `],
   changeDetection: ChangeDetectionStrategy.OnPush,
 })

export class PasswordModalComponent implements OnInit {
    private fb = inject(NonNullableFormBuilder); 
    private nzmodalref = inject(NzModalRef);
    private allItemsModalFactory = AllItemsModalComponent.factory();
    private nzModalData = inject<{ card: PasswordCardModel }>(NZ_MODAL_DATA);
    passwordVisible$ = signal<boolean>(false);

    private card$ = signal<PasswordCardModel>(this.nzModalData.card);

    cardStore = inject(CardStoreService);

    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
        private message: NzMessageService
    ) {}

    form = new FormGroup<PasswordFormGroup>({
        url: this.fb.control<string>('', [Validators.required]),
        name: this.fb.control<string>('', [Validators.required]),
        folder: this.fb.control<string>('', [Validators.required]),
        username: this.fb.control<string>('', [Validators.required]),
        password: this.fb.control<string>('', [Validators.required]),
        notes: this.fb.control<string>('', [Validators.maxLength(200)]),
    });

    ngOnInit(): void {
        if (this.card$()) {
            this.form.reset({
                url: this.card$().url,
                name: this.card$().name,
                folder: this.card$().folder,
                username: this.card$().username,
                password: this.card$().sitePassword,
                notes: this.card$().notes,
            });
        }
    }

    get formValues() {
        return this.form.value;
    }

    closeModal() {
        this.nzmodalref.close();
    }

    returnToAllItems() {
        this.nzmodalref.close();
        this.allItemsModalFactory();
    }

    onSubmit() {
        const userId = this.authService.user$()?.id;
        console.log("алеееееееееееееееееееееее")
        if (userId) {
            const data = this.formValues;
            const card = this.card$();

            const command = {
                id: card?.id,
                type: 'password',
                userId: userId,
                url: data.url!,
                name: data.name!,
                folder: data.folder!,
                username: data.username!,
                sitePassword: data.password!,
                notes: data.notes,
            };
            
            if (card?.id) {
                this.userService.updateCard(command as BaseCardModel).subscribe({
                    next: () => {
                        this.nzmodalref.close();
                        this.cardStore.fetchAllUserData();
                        this.message.success('Пароль успешно обновлен.');
                    },
                    error: () => {
                        this.message.error('При обновлении пароля произошла ошибка.');
                    }
                });
            } else {
                this.userService.addPassword(command).subscribe({
                    next: () => {
                        this.nzmodalref.close();
                        this.cardStore.fetchAllUserData();
                        this.message.success('Пароль успешно создан.');
                    },
                    error: () => {
                        this.message.error('При создании пароля произошла ошибка.');
                    }
                });
            }
        }
    }

    static factory() {
        const nzModalService = inject(NzModalService);
    
        return (card?: PasswordCardModel) => {
            nzModalService.create({
            nzContent: PasswordModalComponent,
            nzCentered: true,
            nzMaskClosable: true,
            nzWidth: 800,
            nzBodyStyle: {
                'padding': '0'
            },
            nzFooter: null,
            nzData: {
                card,
            },
            });
        };
    }
}