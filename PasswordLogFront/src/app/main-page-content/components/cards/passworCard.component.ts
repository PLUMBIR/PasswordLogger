import { Component, computed, input, output, signal } from "@angular/core";
import { NzIconModule } from "ng-zorro-antd/icon";
import { BaseCardModel, CardType } from "../../../models/Cards/BaseCardModel";
import { iconDictionary } from "../../../constants/photos";
import { pastelColors } from "../../../constants/colors";
import { NzDropDownModule } from "ng-zorro-antd/dropdown";
import { NzMessageService } from "ng-zorro-antd/message";

@Component({
  selector: 'password-card',
  standalone: true,
  imports: [
    NzIconModule,
    NzDropDownModule
  ],
  template: `
    <div class="card">
        <div class="card-content">
          @if(imageSource()) {
            <div class="item-icon">
                  <img [src]="imageSource()" alt="">
                <div class="overlay">
                    <button class="btn" (click)="openUrl(card().url!)">Перейти</button>
                </div>
            </div>
          } @else {
            <div class="item-icon" [style.background-color]="itemColor()">
                <nz-icon nzType="lock" nzTheme="outline" style="font-size: 32px; color: #fff"/>
                <div class="overlay">
                    <button class="btn" (click)="openUrl(card().url!)">Перейти</button>
                </div>
            </div>
          }
            <div class="item-info">
                <div class="item-info-name">
                    <p>{{card().name}}</p>
                    <div class="item-info-buttons">
                        <nz-icon nzType="edit" nzTheme="outline" (click)="onEditCard.emit({ id: card().id, type: 'password' })"/>
                        <nz-icon nzType="delete" nzTheme="outline" (click)="onDeleteCard.emit({ id: card().id, type: 'password' })"/>
                        <nz-icon nzType="more" nzTheme="outline" nz-dropdown nzTrigger="click" [nzDropdownMenu]="menu"/>
                        <nz-dropdown-menu #menu="nzDropdownMenu">
                          <ul nz-menu>
                            <li nz-menu-item (click)="copyUserName()">
                              <nz-icon nzType="user" nzTheme="outline" />
                              Скопировать логин
                            </li>
                            <li nz-menu-item (click)="copySitePassword()">
                              <nz-icon nzType="lock" nzTheme="outline" />
                              Скопировать пароль</li>
                          </ul>
                        </nz-dropdown-menu>
                    </div>
                </div>
                <p>{{card().username}}</p>
            </div>
        </div>
    </div>
    `,
  styles: [
    `
    .card {
      background-color: #fff;
      border-radius: 2px;
      box-shadow: 0 1px 3px rgba(0, 24, 48, .2);
      height: 130px;
      margin: 15px 0 15px 15px;
      width: 270px;
    }

    .item-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 78px;
      width: 100%;
    }

    .overlay {
      position: absolute;
      width: 270px;
      height: 78px;
      background-color: rgba(128, 128, 128, 0.5);
      display: flex;
      justify-content: center; 
      align-items: center; 
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .card:hover .overlay {
      opacity: 1;
    }

    .btn {
      padding: 10px 20px;
      width: 100%;
      height: 100%;
      background-color: rgba(147, 172, 196, 0.8);
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer; 
    }

    .item-info {
      height: 50px;
      margin: 0 10px;

      p {
        margin-bottom: 0px;
        opacity: .6;
      } 
    }

    .item-info-name {
      display: flex;
      justify-content: space-between;

      p {
        color: #465e7b;
        font-family: Open Sans, sans-serif;
        font-size: 15px;
        font-weight: 600;
        margin-bottom: 0;
        opacity: 1;
      }
    }

    .item-info-buttons {
      display: flex;
      gap: 10px;
      cursor: pointer;

      nz-icon {
        font-size: 16px;
      }

      nz-icon:hover {
        color: rgba(209, 47, 46, 0.9);
      }
    }

    .btn:hover {
        background-color: rgba(209, 47, 46, 0.7);
        color: #fff;
    }
    `,
  ]
})

export class PasswordCardComponent {
  card = input.required<BaseCardModel>();

  constructor(
      private message: NzMessageService
  ) {}

  imageSource = computed(() => {
    const key = Object.keys(iconDictionary).find(k => this.card().name?.includes(k));
    return key ? iconDictionary[key] : null;
  });


  getRandomColor = () => pastelColors[Math.floor(Math.random() * pastelColors.length)];

  itemColor = signal(this.getRandomColor());

  onEditCard = output<{ id: string; type: CardType }>();
  onDeleteCard = output<{ id: string; type: CardType }>();

  openUrl(url: string) {
    window.open(url, '_blank');
  }

  copyUserName(): void {
    const username = this.card().username;
    if (username) {
      navigator.clipboard.writeText(username).then(
        () => this.message.success('Логин скопирован!'),
        () => this.message.error('Не удалось скопировать логин.')
      );
    }
  }

  copySitePassword(): void {
    const password = this.card().sitePassword;
    if (password) {
      navigator.clipboard.writeText(password).then(
        () => this.message.success('Пароль скопирован!'),
        () => this.message.error('Не удалось скопировать пароль.')
      );
    }
  }
}