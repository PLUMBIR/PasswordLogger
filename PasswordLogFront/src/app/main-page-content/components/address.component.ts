import { UserService } from './../../services/user.service';
import { Component, ChangeDetectionStrategy, inject } from "@angular/core";
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzDividerModule } from "ng-zorro-antd/divider";
import { NzDropDownModule } from "ng-zorro-antd/dropdown";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { NzMenuModule } from "ng-zorro-antd/menu";
import { NzModalModule, NzModalRef, NzModalService } from "ng-zorro-antd/modal";
import { AuthService } from '../../services/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AllItemsModalComponent } from './all-items.component';

export interface AddressFormGroup {
  name: FormControl<string>;
  folder: FormControl<string>;
  title: FormControl<string>;
  firstName: FormControl<string>;
  middleName: FormControl<string>;
  lastName: FormControl<string>;
  address1: FormControl<string>;
  address2: FormControl<string>;
  address3: FormControl<string>;
  cityOrTown: FormControl<string>;
  mobilePhone: FormControl<string>;
  notes: FormControl<string>;
}

@Component({
   selector: 'address-modal',
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
                <span class="header-modal-logo">Добавить адрес</span>
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
                                <span>Заголовок:</span>
                                <nz-form-item>
                                    <nz-form-control [nzSm]="14" [nzXs]="24" nzErrorTip="Пожалуйста, введите Заголовок">
                                        <input nz-input formControlName="title" />
                                    </nz-form-control>
                                </nz-form-item>
                            </div>
                            <div class="item">
                                <span>Имя:</span>
                                <nz-form-item>
                                    <nz-form-control [nzSm]="14" [nzXs]="24" nzErrorTip="Пожалуйста, введите Имя">
                                        <input nz-input formControlName="firstName" />
                                    </nz-form-control>
                                </nz-form-item>
                            </div>
                            <div class="item">
                                <span>Отчество:</span>
                                <nz-form-item>
                                    <nz-form-control [nzSm]="14" [nzXs]="24" nzErrorTip="Пожалуйста, введите Отчество">
                                        <input nz-input formControlName="middleName" />
                                    </nz-form-control>
                                </nz-form-item>
                            </div>
                            <div class="item">
                                <span>Фамилия:</span>
                                <nz-form-item>
                                    <nz-form-control [nzSm]="14" [nzXs]="24" nzErrorTip="Пожалуйста, введите Фамилию">
                                        <input nz-input formControlName="lastName" />
                                    </nz-form-control>
                                </nz-form-item>
                            </div>
                            <div class="item">
                                <span>Адрес 1:</span>
                                <nz-form-item>
                                    <nz-form-control [nzSm]="14" [nzXs]="24" nzErrorTip="Пожалуйста, введите Aдрес">
                                        <input nz-input formControlName="address1" />
                                    </nz-form-control>
                                </nz-form-item>
                            </div>
                            <div class="item">
                                <span>Адрес 2:</span>
                                <nz-form-item>
                                    <nz-form-control [nzSm]="14" [nzXs]="24">
                                        <input nz-input formControlName="address2" />
                                    </nz-form-control>
                                </nz-form-item>
                            </div>
                            <div class="item">
                                <span>Адрес 3:</span>
                                <nz-form-item>
                                    <nz-form-control [nzSm]="14" [nzXs]="24">
                                        <input nz-input formControlName="address3" />
                                    </nz-form-control>
                                </nz-form-item>
                            </div>
                            <div class="item">
                                <span>Город:</span>
                                <nz-form-item>
                                    <nz-form-control [nzSm]="14" [nzXs]="24" nzErrorTip="Пожалуйста, введите Город">
                                        <input nz-input formControlName="cityOrTown" />
                                    </nz-form-control>
                                </nz-form-item>
                            </div>
                            <div class="item">
                                <span>Телефон:</span>
                                <nz-form-item>
                                    <nz-form-control [nzSm]="14" [nzXs]="24">
                                        <input nz-input formControlName="mobilePhone" />
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

export class AddressModalComponent {
    private fb = inject(NonNullableFormBuilder); 
    private nzmodalref = inject(NzModalRef);
    private allItemsModalFactory = AllItemsModalComponent.factory();

    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
        private message: NzMessageService
    ) {}

    static factory() {
        const nzModalService = inject(NzModalService);
    
        return () => {
            nzModalService.create({
            nzContent: AddressModalComponent,
            nzCentered: true,
            nzMaskClosable: true,
            nzWidth: 1000,
            nzBodyStyle: {
                'padding': '0'
            },
            nzFooter: null
            });
        };
    }

    form = new FormGroup<AddressFormGroup>({
        name: this.fb.control<string>('', [Validators.required]),
        folder: this.fb.control<string>('', [Validators.required]),
        title: this.fb.control<string>('', [Validators.required]),
        firstName: this.fb.control<string>('', [Validators.required]),
        middleName: this.fb.control<string>(''),
        lastName: this.fb.control<string>('', [Validators.required]),
        address1: this.fb.control<string>('', [Validators.required]),
        address2: this.fb.control<string>(''),
        address3: this.fb.control<string>(''),
        cityOrTown: this.fb.control<string>('', [Validators.required]),
        mobilePhone: this.fb.control<string>(''),
        notes: this.fb.control<string>('')
    });

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

            const command = {
                userId: userId,
                name: data.name!,
                folder: data.folder!,
                title: data.title!,
                firstName: data.firstName!,
                middleName: data.middleName,
                lastName: data.lastName!,
                address1: data.address1!,
                address2: data.address2,
                address3: data.address3,
                cityOrTown: data.cityOrTown!,
                mobilePhone: data.mobilePhone,
                notes: data.notes,
            };

            this.userService.addAddress(command).subscribe(
                (result) => {
                    this.nzmodalref.close();
                    this.message.success('Адрес успешно добавлен.');
                }
            );
        }
    }
}