import { UserService } from './../../services/user.service';
import { Component, ChangeDetectionStrategy, inject, signal, OnInit } from "@angular/core";
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
import { NzMessageService } from 'ng-zorro-antd/message';
import { AllItemsModalComponent } from './all-items.component';
import { NoteCardModel } from '../../models/Cards/NoteCardModel';
import { BaseCardModel } from '../../models/Cards/BaseCardModel';
import { CardStoreService } from '../../services/card.service';

export interface NoteFormGroup {
  name: FormControl<string>;
  folder: FormControl<string>;
  text: FormControl<string>;
}

@Component({
   selector: 'note-modal',
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
                <span class="header-modal-logo">Добавить заметку</span>
            </div>
        </div>
        <div class="modal-content">
            <div class="modal-content-inputs">
                <form nz-form [formGroup]="form">
                    <div class="note-modal">
                        <div class="left-content">
                            <div class="input-item">
                                <span>Имя:</span>
                                <nz-form-item>
                                    <nz-form-control nzErrorTip="Пожалуйста, введите имя">
                                        <input nz-input id="name" formControlName="name" placeholder="Имя" />
                                    </nz-form-control>
                                </nz-form-item>
                            </div>
                            <div class="input-item">
                                <span>Папка:</span>
                                <nz-form-item>
                                    <nz-form-control nzErrorTip="Пожалуйста, укажите папку">
                                        <input nz-input id="folder" formControlName="folder" placeholder="Папка" />
                                    </nz-form-control>
                                </nz-form-item>
                            </div>
                        </div>
                        <div class="right-content">
                            <nz-form-item style="margin-bottom: 0px;">
                                <nz-form-control [nzSpan]="12" nzHasFeedback>
                                    <nz-textarea-count>
                                        <textarea formControlName="text" nz-input rows="20"></textarea>
                                    </nz-textarea-count>
                                </nz-form-control>
                            </nz-form-item>
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

        .note-modal {
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
        }

        .inputs { 
            display: flex;
            flex-direction: column; 
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

export class NoteModalComponent implements OnInit{
    private fb = inject(NonNullableFormBuilder); 
    private nzmodalref = inject(NzModalRef);
    private allItemsModalFactory = AllItemsModalComponent.factory();

    private nzModalData = inject<{ card: NoteCardModel }>(NZ_MODAL_DATA);

    private card$ = signal<NoteCardModel>(this.nzModalData.card);

    cardStore = inject(CardStoreService);

    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
        private message: NzMessageService
    ) {}

    form = new FormGroup<NoteFormGroup>({
        name: this.fb.control<string>('', [Validators.required]),
        folder: this.fb.control<string>('', []),
        text: this.fb.control<string>('', [Validators.required])
    });

    ngOnInit(): void {
        if (this.card$()) {
            this.form.reset({
                name: this.card$().name,
                folder: this.card$().folder,
                text: this.card$().text
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
                type: 'note',
                userId: userId,
                name: data.name!,
                folder: data.folder!,
                text: data.text!,
            };

            if (card?.id) {
                this.userService.updateCard(command as BaseCardModel).subscribe({
                    next: () => {
                        this.nzmodalref.close();
                        this.cardStore.fetchAllUserData();
                        this.message.success('Заметка успешно обновлена.');
                    },
                    error: () => {
                        this.message.error('При обновлении заметки произошла ошибка.');
                    }
                });
            } else {
                this.userService.addNote(command).subscribe({
                    next: () => {
                        this.nzmodalref.close();
                        this.cardStore.fetchAllUserData();
                        this.message.success('Заметка успешно создана.');
                    },
                    error: () => {
                        this.message.error('При создании заметки произошла ошибка.');
                    }
                });
            }
        }
    }

    static factory() {
        const nzModalService = inject(NzModalService);
    
        return (card?: NoteCardModel) => {
            nzModalService.create({
            nzContent: NoteModalComponent,
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