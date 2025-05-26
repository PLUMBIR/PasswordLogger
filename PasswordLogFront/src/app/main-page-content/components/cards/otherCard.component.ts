import { Component, input, output, signal } from "@angular/core";
import { NzIconModule } from "ng-zorro-antd/icon";
import { BaseCardModel, CardType } from "../../../models/Cards/BaseCardModel";

@Component({
  selector: 'other-card',
  standalone: true,
  imports: [
    NzIconModule
  ],
  template: `
    <div class="card">
        <div class="card-content">
            <div class="item-icon" [style.background-color]="itemColor()">
                <!-- <img src="twitch.png" alt=""> -->
                @if (card().type == 'note') {
                    <nz-icon nzType="file" nzTheme="outline" style="font-size: 32px; color: #fff"/>
                }
                @if (card().type == 'address') {
                    <nz-icon nzType="global" nzTheme="outline" style="font-size: 32px; color: #fff"/>
                }
                @if (card().type == 'creditCard') {
                    <nz-icon nzType="credit-card" nzTheme="outline" style="font-size: 32px; color: #fff"/>
                }
                @if (card().type == 'bankAccount') {
                    <nz-icon nzType="bank" nzTheme="outline" style="font-size: 32px; color: #fff"/>
                }
                <div class="overlay">
                    <button class="btn" >Изменить</button>
                </div>
            </div>
            <div class="item-info">
                @if (card().type == 'note') {
                    <div class="item-info-name">
                        <p>{{card().name}}</p>
                        <div class="item-info-buttons">
                            <nz-icon nzType="edit" nzTheme="outline" />
                            <!-- <nz-icon nzType="usergroup-add" nzTheme="outline" /> -->
                            <nz-icon nzType="delete" nzTheme="outline" (click)="onDeleteCard.emit({ id: card().id, type: 'note' })"/>
                        </div>
                    </div>
                }
                @if (card().type == 'address') {
                    <div class="item-info-name">
                        <p>{{card().firstName}} {{card().lastName}}</p>
                        <div class="item-info-buttons">
                            <nz-icon nzType="edit" nzTheme="outline" />
                            <!-- <nz-icon nzType="usergroup-add" nzTheme="outline" /> -->
                            <nz-icon nzType="delete" nzTheme="outline" (click)="onDeleteCard.emit({ id: card().id, type: 'address' })"/>
                        </div>
                    </div>
                    <p>{{card().address1}}</p>
                }
                @if (card().type == 'creditCard') {
                    <div class="item-info-name">
                        <p>{{card().name}}</p>
                        <div class="item-info-buttons">
                            <nz-icon nzType="edit" nzTheme="outline" />
                            <!-- <nz-icon nzType="usergroup-add" nzTheme="outline" /> -->
                            <nz-icon nzType="delete" nzTheme="outline" (click)="onDeleteCard.emit({ id: card().id, type: 'creditCard' })"/>
                        </div>
                    </div>
                    <p>Заканчивается на {{ card().number?.toString()?.slice(-4) }}</p>
                }
                @if (card().type == 'bankAccount') {
                    <div class="item-info-name">
                        <p>{{card().bankName}}</p>
                        <div class="item-info-buttons">
                            <nz-icon nzType="edit" nzTheme="outline" />
                            <!-- <nz-icon nzType="usergroup-add" nzTheme="outline" /> -->
                            <nz-icon nzType="delete" nzTheme="outline" (click)="onDeleteCard.emit({ id: card().id, type: 'bankAccount' })"/>
                        </div>
                    </div>
                    <p>Заканчивается на {{ card().accountNumber?.toString()?.slice(-4) }}</p>
                }
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

      nz-icon {
        font-size: 16px;
      }
    }

    .btn:hover {
        background-color: rgba(209, 47, 46, 0.7);
        color: #fff;
    }
    `,
  ]
})

export class OtherCardComponent {
  card = input.required<BaseCardModel>();

  pastelColors = [
    "#A7C7E7", 
    "#F4A3BB", 
    "#B8E986", 
    "#FFD580", 
    "#C3B1E1",  
    "#A5D6A7", 
    "#F5D76E",
  ];

  getRandomColor = () => this.pastelColors[Math.floor(Math.random() * this.pastelColors.length)];

  itemColor = signal(this.getRandomColor());


  onDeleteCard = output<{ id: string; type: CardType }>();
}