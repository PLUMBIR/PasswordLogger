import { Component, ChangeDetectionStrategy, inject, signal } from "@angular/core";
import { FormControl, ReactiveFormsModule, NonNullableFormBuilder, FormGroup, Validators } from "@angular/forms";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzDividerModule } from "ng-zorro-antd/divider";
import { NzDropDownModule } from "ng-zorro-antd/dropdown";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { NzMenuModule } from "ng-zorro-antd/menu";
import { NzMessageService } from "ng-zorro-antd/message";
import { NZ_MODAL_DATA, NzModalModule, NzModalRef, NzModalService } from "ng-zorro-antd/modal";
import { AuthService } from "../../services/auth.service";
import { UserService } from "../../services/user.service";
import { AllItemsModalComponent } from "./all-items.component";
import { PaymentCardModel } from "../../models/Cards/PaymentCardModel";
import { BaseCardModel } from "../../models/Cards/BaseCardModel";
import { CardStoreService } from "../../services/card.service";

export interface CreditCardFormGroup {
  name: FormControl<string>;
  folder: FormControl<string>;
  nameOnCard: FormControl<string>;
  number: FormControl<number | null>;
  securityCode: FormControl<number | null>;
  startDate: FormControl<string>;
  expirationDate: FormControl<string>;
  notes: FormControl<string>;
}

@Component({
   selector: 'credit-card-modal',
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
                <span class="header-modal-logo">Добавить кредитную карту</span>
            </div>
        </div>
        <div class="modal-content">
            <div class="modal-content-inputs">
                <form nz-form [formGroup]="form" (ngSubmit)="onSubmit()">
                    <div class="address-modal">
                        <div class="left-content">
                            <div class="input-item">
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
                        </div>
                        <div class="right-content">
                            <div class="item">
                                <span>Имя на карте:</span>
                                <nz-form-item>
                                    <nz-form-control [nzSm]="14" [nzXs]="24" nzErrorTip="Пожалуйста, введите имя">
                                        <input nz-input formControlName="nameOnCard" />
                                    </nz-form-control>
                                </nz-form-item>
                            </div>
                            <div class="item">
                                <span>Номер:</span>
                                <nz-form-item>
                                    <nz-form-control [nzSm]="14" [nzXs]="24" nzErrorTip="Пожалуйста, введите номер">
                                        <input nz-input formControlName="number" />
                                    </nz-form-control>
                                </nz-form-item>
                            </div>
                            <div class="item">
                                <span>Секретный код:</span>
                                <nz-form-item>
                                    <nz-form-control [nzSm]="14" [nzXs]="24" nzErrorTip="Пожалуйста, введите секретный код">
                                        <nz-input-group [nzSuffix]="suffixTemplate">
                                            <input
                                                [type]="securityCodeVisible$() ? 'text' : 'password'"
                                                nz-input
                                                formControlName="securityCode"
                                            />
                                        </nz-input-group>
                                    </nz-form-control>
                                </nz-form-item>
                                <ng-template #suffixTemplate>
                                    <nz-icon
                                        class="ant-input-password-icon"
                                        [nzType]="securityCodeVisible$() ? 'eye-invisible' : 'eye'"
                                        (click)="securityCodeVisible$.set(!securityCodeVisible$())"
                                    />
                                </ng-template>
                            </div>
                            <div class="item">
                                <span>Дата начала:</span>
                                <nz-form-item>
                                    <nz-form-control [nzSm]="14" [nzXs]="24" nzErrorTip="Пожалуйста, введите дату начала">
                                        <input nz-input formControlName="startDate" />
                                    </nz-form-control>
                                </nz-form-item>
                            </div>
                            <div class="item">
                                <span>Дата окончания срока:</span>
                                <nz-form-item>
                                    <nz-form-control [nzSm]="14" [nzXs]="24" nzErrorTip="Пожалуйста, введите дату окончания">
                                        <input nz-input formControlName="expirationDate" />
                                    </nz-form-control>
                                </nz-form-item>
                            </div>
                            <div class="item-notes">
                                <span>Примечания:</span>
                                <nz-form-item style="margin-bottom: 0px;">
                                    <nz-form-control [nzSpan]="12" nzHasFeedback>
                                        <nz-textarea-count>
                                            <textarea formControlName="notes" nz-input rows="1"></textarea>
                                        </nz-textarea-count>
                                    </nz-form-control>
                                </nz-form-item>
                            </div>
                        </div>
                    </div>
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
            margin-left: 275px;
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

        .address-modal {
            display: flex;
        }

        .left-content {
            width: 35%;
            padding: 20px;
            border-right: 1px solid #b7b7b7;
            display: flex;
            flex-direction: column;
        }

        .right-content {
            width: 65%;
            padding: 20px;
            background-color: #fff;
            display: flex;
            flex-direction: column;
            max-height: 533px;
            overflow-y: auto;
        }

        .item {
            display: flex;
            align-items: baseline;
            border: 1px solid #b7b7b7;
            height: 60px;
            border-bottom: 0px;

            span {
                width: 40%;
                text-align: end;
                padding: 10px 16px;
            }

            nz-form-item {
                margin-bottom: 0px;
                width: 60%;
                margin: 0px 10px;
            }
        }

        .item-notes {
            display: flex;
            border: 1px solid #b7b7b7;
            height: 60px;

            span {
                width: 40%;
                text-align: end;
                padding: 10px 16px;
            }

            nz-form-item {
                margin-bottom: 0px;
                width: 60%;
                margin: 0px 10px;
                margin-top: 10px;
            }
        }

        .modal-buttons {
            display: flex;
            justify-content: end;
            padding: 15px 16px;
            gap: 10px;
            background-color: #f9fbfd;
            border-top: 1px solid #b7b7b7;
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

export class CreditCardModalComponent {
    private fb = inject(NonNullableFormBuilder); 
    private nzmodalref = inject(NzModalRef);
    private allItemsModalFactory = AllItemsModalComponent.factory();
    private nzModalData = inject<{ card: PaymentCardModel }>(NZ_MODAL_DATA);
    securityCodeVisible$ = signal<boolean>(false);

    private card$ = signal<PaymentCardModel>(this.nzModalData.card);

    cardStore = inject(CardStoreService);

    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
        private message: NzMessageService
    ) {}

    form = new FormGroup<CreditCardFormGroup>({
        name: this.fb.control<string>('', [Validators.required]),
        folder: this.fb.control<string>('', [Validators.required]),
        nameOnCard: this.fb.control<string>('', [Validators.required]),
        number: this.fb.control<number | null>(null, [Validators.required]),
        securityCode: this.fb.control<number | null>(null, [Validators.required]),
        startDate: this.fb.control<string>('', [Validators.required]),
        expirationDate: this.fb.control<string>('', [Validators.required]),
        notes: this.fb.control<string>('')
    });

    ngOnInit(): void {
        if (this.card$()) {
            this.form.reset({
                name: this.card$().name,
                folder: this.card$().folder,
                nameOnCard: this.card$().nameOnCard,
                number: this.card$().number,
                securityCode: this.card$().securityCode,
                startDate: this.card$().startDate,
                expirationDate: this.card$().expirationDate,
                notes: this.card$().notes
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

        if (userId) {
            const data = this.formValues;
            const card = this.card$();

            const command = {
                id: card?.id,
                type: 'creditCard',
                userId: userId,
                name: data.name!,
                folder: data.folder!,
                nameOnCard: data.nameOnCard!,
                number: data.number!,
                securityCode: data.securityCode!,
                startDate: data.startDate!,
                expirationDate: data.expirationDate!,
                notes: data.notes,
            };

            if (card?.id) {
                this.userService.updateCard(command as BaseCardModel).subscribe({
                    next: () => {
                        this.nzmodalref.close();
                        this.cardStore.fetchAllUserData();
                        this.message.success('Кредитная карта успешно обновлена.');
                    },
                    error: () => {
                        this.message.error('При обновлении кредитной карты произошла ошибка.');
                    }
                });
            } else {
                this.userService.addCreditCard(command).subscribe({
                    next: () => {
                        this.nzmodalref.close();
                        this.cardStore.fetchAllUserData();
                        this.message.success('Кредитная карта успешно добавлена.');
                    },
                    error: () => {
                        this.message.error('При создании кредитной карты произошла ошибка.');
                    }
                });
            }
        }
    }

    static factory() {
        const nzModalService = inject(NzModalService);
    
        return (card?: PaymentCardModel) => {
            nzModalService.create({
            nzContent: CreditCardModalComponent,
            nzCentered: true,
            nzMaskClosable: true,
            nzWidth: 1000,
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