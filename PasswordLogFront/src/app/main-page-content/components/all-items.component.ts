import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzModalModule, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { PasswordModalComponent } from './password.component';
import { NoteModalComponent } from './note.component';
import { AddressModalComponent } from './address.component';
import { CreditCardModalComponent } from './card.component';
import { BankAccountModalComponent } from './bank.component';

@Component({
   selector: 'all-items-modal',
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
                <span class="header-modal-title">Добавить элемент</span>
                <span class="header-modal-logo">Парольник</span>
            </div>
        </div>
        <div class="modal-content">
            <div class="modal-content-cards">
                <div class="modal-item" (click)="openPasswordModal()">
                    <nz-icon nzType="lock" nzTheme="outline" />
                    <span>ПАРОЛЬ</span>
                </div>
                <div class="modal-item" (click)="openNoteModal()">
                    <nz-icon nzType="form" nzTheme="outline" />
                    <span>ЗАМЕТКА</span>
                </div>
                <div class="modal-item" (click)="openAddressModal()">
                    <nz-icon nzType="contacts" nzTheme="outline" />
                    <span>АДЕРС</span>
                </div>
                <div class="modal-item" (click)="openCreditCardModal()">
                    <nz-icon nzType="credit-card" nzTheme="outline" />
                    <span>КРЕДИТНАЯ КАРТА</span>
                </div>
                <div class="modal-item" (click)="openBankAccountModal()">
                    <nz-icon nzType="bank" nzTheme="outline" />
                    <span>БАНКОВСИЙ СЧЕТ</span>
                </div>
            </div>
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
        }

        .header-modal-inner {
            margin-top: 7px;
        }

        .header-modal-title {
            margin-left: 10px;
            font-family: Open Sans, sans-serif;
            font-size: 16px;
            color: #fff;
            font-weight: 600;
        }

        .header-modal-logo {
            margin-left: 170px;
            font-size: 28px;
            font-family: Open Sans, sans-serif;
            color: #fff;
            font-weight: 600;
        }

        ::ng-deep .ant-modal-close-x {
            color: #fff;
        } 

        .modal-content {
            background-color: #f9fbfd;
            padding: 15px 15px 15px;
        }

        .modal-content-cards {
            display: flex;
            flex-wrap: wrap;
            gap: 5px; 
        }

        .modal-item {
            width: 200px;
            height: 100px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center; 
            cursor: pointer;

            nz-icon {
                font-size: 42px;
                color: #646d73;
            }

            span {
                color: #646d73;
                font-size: 13px;
                font-weight: 600;
                line-height: 17px;
                user-select: none;
            }
        }

        .modal-item:hover {
            background-color: #fff;
            box-shadow: 0 3px 6px 0 rgba(0, 0, 0, .23), 0 3px 6px 0 rgba(0, 0, 0, .16);
        }
    `],
   changeDetection: ChangeDetectionStrategy.OnPush,
 })
 
export class AllItemsModalComponent {
    private nzmodalref = inject(NzModalRef);
    private passwordModalFactory = PasswordModalComponent.factory();
    private noteModalFactory = NoteModalComponent.factory();
    private addressModalFactory = AddressModalComponent.factory();
    private creditCardModalFactory = CreditCardModalComponent.factory();
    private bankAccountModalFactory = BankAccountModalComponent.factory();

    static factory() {
        const nzModalService = inject(NzModalService);
    
        return () => {
            nzModalService.create({
            nzContent: AllItemsModalComponent,
            nzCentered: true,
            nzMaskClosable: true,
            nzWidth: 850,
            nzBodyStyle: {
                'padding': '0'
            },
            nzFooter: null
            });
        };
    }

    openPasswordModal() {
        this.nzmodalref.close();
        this.passwordModalFactory();
    }

    openNoteModal() {
        this.nzmodalref.close();
        this.noteModalFactory();
    }

    openAddressModal() {
        this.nzmodalref.close();
        this.addressModalFactory();
    }

    openCreditCardModal() {
        this.nzmodalref.close();
        this.creditCardModalFactory();
    }

    openBankAccountModal() {
        this.nzmodalref.close();
        this.bankAccountModalFactory();
    }
}