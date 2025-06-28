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
import { BankAccountCardModel } from "../../models/Cards/BankAccountCardModel";
import { BaseCardModel } from "../../models/Cards/BaseCardModel";
import { CardStoreService } from "../../services/card.service";

export interface BankFormGroup { 
  name: FormControl<string>;          
  folder: FormControl<string>;       
  bankName: FormControl<string>;           
  accountNumber: FormControl<string>;     
  SWIFTCode: FormControl<string>;        
  IBANNumber: FormControl<string>;        
  PIN: FormControl<number | null>;          
  branchPhone: FormControl<string>;   
  notes: FormControl<string>;              
}

@Component({
   selector: 'bank-account-modal',
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
                <form nz-form [formGroup]="form">
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
                                <span>Название банка:</span>
                                <nz-form-item>
                                    <nz-form-control [nzSm]="14" [nzXs]="24" nzErrorTip="Пожалуйста, введите название банка">
                                        <input nz-input formControlName="bankName" />
                                    </nz-form-control>
                                </nz-form-item>
                            </div>
                            <div class="item">
                                <span>Номер счета:</span>
                                <nz-form-item>
                                    <nz-form-control [nzSm]="14" [nzXs]="24" nzErrorTip="Пожалуйста, введите номер счета">
                                        <input nz-input formControlName="accountNumber" />
                                    </nz-form-control>
                                </nz-form-item>
                            </div>
                            <div class="item">
                                <span>SWIFT-код:</span>
                                <nz-form-item>
                                    <nz-form-control [nzSm]="14" [nzXs]="24" nzErrorTip="Пожалуйста, введите SWIFT-код">
                                        <nz-input-group [nzSuffix]="swiftSuffix">
                                            <input
                                                [type]="swiftVisible$() ? 'text' : 'password'"
                                                nz-input
                                                formControlName="SWIFTCode"
                                            />
                                        </nz-input-group>
                                    </nz-form-control>
                                </nz-form-item>
                            </div>

                            <div class="item">
                                <span>IBAN:</span>
                                <nz-form-item>
                                    <nz-form-control [nzSm]="14" [nzXs]="24" nzErrorTip="Пожалуйста, введите IBAN">
                                        <nz-input-group [nzSuffix]="ibanSuffix">
                                            <input
                                                [type]="ibanVisible$() ? 'text' : 'password'"
                                                nz-input
                                                formControlName="IBANNumber"
                                            />
                                        </nz-input-group>
                                    </nz-form-control>
                                </nz-form-item>
                            </div>

                            <div class="item">
                                <span>PIN:</span>
                                <nz-form-item>
                                    <nz-form-control [nzSm]="14" [nzXs]="24" nzErrorTip="Пожалуйста, введите PIN (неотрицательное число)">
                                        <nz-input-group [nzSuffix]="pinSuffix">
                                            <input
                                                [type]="pinVisible$() ? 'text' : 'password'"
                                                nz-input
                                                formControlName="PIN"
                                            />
                                        </nz-input-group>
                                    </nz-form-control>
                                </nz-form-item>
                            </div>

                            <ng-template #swiftSuffix>
                                <nz-icon
                                    class="ant-input-password-icon"
                                    [nzType]="swiftVisible$() ? 'eye-invisible' : 'eye'"
                                    (click)="swiftVisible$.set(!swiftVisible$())"
                                />
                            </ng-template>

                            <ng-template #ibanSuffix>
                                <nz-icon
                                    class="ant-input-password-icon"
                                    [nzType]="ibanVisible$() ? 'eye-invisible' : 'eye'"
                                    (click)="ibanVisible$.set(!ibanVisible$())"
                                />
                            </ng-template>

                            <ng-template #pinSuffix>
                                <nz-icon
                                    class="ant-input-password-icon"
                                    [nzType]="pinVisible$() ? 'eye-invisible' : 'eye'"
                                    (click)="pinVisible$.set(!pinVisible$())"
                                />
                            </ng-template>

                            <div class="item">
                                <span>Телефон отделения:</span>
                                <nz-form-item>
                                    <nz-form-control [nzSm]="14" [nzXs]="24" nzErrorTip="Пожалуйста, введите телефон">
                                        <input nz-input formControlName="branchPhone" />
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
            <button class="submit-btn" (click)="onSubmit()">
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

export class BankAccountModalComponent {
    private fb = inject(NonNullableFormBuilder); 
    private nzmodalref = inject(NzModalRef);
    private allItemsModalFactory = AllItemsModalComponent.factory();
    private nzModalData = inject<{ card: BankAccountCardModel }>(NZ_MODAL_DATA);

    swiftVisible$ = signal<boolean>(false);
    ibanVisible$ = signal<boolean>(false);
    pinVisible$ = signal<boolean>(false);

    private card$ = signal<BankAccountCardModel>(this.nzModalData.card);

    cardStore = inject(CardStoreService);

    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
        private message: NzMessageService
    ) {}

    static factory() {
        const nzModalService = inject(NzModalService);
    
        return (card? : BankAccountCardModel) => {
            nzModalService.create({
            nzContent: BankAccountModalComponent,
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

    form = new FormGroup<BankFormGroup>({
        name: this.fb.control<string>('', [Validators.required]),
        folder: this.fb.control<string>('', []),
        bankName: this.fb.control<string>('', [Validators.required]),
        accountNumber: this.fb.control<string>('', [Validators.required]),
        SWIFTCode: this.fb.control<string>(''),
        IBANNumber: this.fb.control<string>(''),
        PIN: this.fb.control<number | null>(null, [Validators.required, Validators.min(0)]),
        branchPhone: this.fb.control<string>('', [Validators.required]),
        notes: this.fb.control<string>('')
    });

    ngOnInit(): void {
        if (this.card$()) {
            this.form.reset({
                name: this.card$().name,
                folder: this.card$().folder,
                bankName: this.card$().bankName,
                accountNumber: this.card$().accountNumber,
                SWIFTCode: this.card$().swiftCode,
                IBANNumber: this.card$().ibanNumber,
                PIN: this.card$().pin,
                branchPhone: this.card$().branchPhone,
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
        Object.values(this.form.controls).forEach(control => {
            control.markAsDirty();
            control.markAsTouched();
            control.updateValueAndValidity();
        });

        if (this.form.invalid) {
            return;
        }

        const userId = this.authService.user$()?.id;

        if (userId) {
            const data = this.formValues;
            const card = this.card$();

            const command = {
                id: card?.id,
                type: 'bankAccount',
                userId: userId,
                name: data.name!,
                folder: data.folder!,
                bankName: data.bankName!,
                accountNumber: data.accountNumber!,
                SWIFTCode: data.SWIFTCode,
                IBANNumber: data.IBANNumber,
                PIN: data.PIN!,
                branchPhone: data.branchPhone!,
                notes: data.notes
            };

            this.userService.addBankAccount(command).subscribe({
                next: (result) => {
                    this.nzmodalref.close();
                    this.cardStore.fetchAllUserData();
                    this.message.success('Банковский аккаунт успешно добавлен.');
                },
                error: (err) => {
                    this.message.error('При создании банковского аккаунта произошла ошибка.');
                }
            });

            if (card?.id) {
                this.userService.updateCard(command as BaseCardModel).subscribe({
                    next: () => {
                        this.nzmodalref.close();
                        this.cardStore.fetchAllUserData();
                        this.message.success('Банковский аккаунт успешно обновлен.');
                    },
                    error: () => {
                        this.message.error('При обновлении банковский аккаунт произошла ошибка.');
                    }
                });
            } else {
                this.userService.addBankAccount(command).subscribe({
                    next: () => {
                        this.nzmodalref.close();
                        this.message.success('Банковский аккаунт успешно добавлен.');
                    },
                    error: () => {
                        this.message.error('При создании банковского аккаунта произошла ошибка.');
                    }
                });
            }
        }
    }
}