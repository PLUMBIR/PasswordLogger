import { Component, input, output } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { PasswordCardModel } from "../../../models/Cards/PasswordCardModel";
import { NzIconModule } from "ng-zorro-antd/icon";
import { BaseCardModel } from "../../../models/Cards/BaseCardModel";

@Component({
  selector: 'password-card',
  standalone: true,
  imports: [
    NzIconModule
  ],
  template: `
    <div class="card">
        <div class="card-content">
            <div class="item-icon">
                <img src="twitch.png" alt="">
                <div class="overlay">
                    <button class="btn">Перейти</button>
                </div>
            </div>
            <div class="item-info">
                <div class="item-info-name">
                    <p>{{card().name}}</p>
                    <div class="item-info-buttons">
                        <nz-icon nzType="edit" nzTheme="outline" />
                        <nz-icon nzType="usergroup-add" nzTheme="outline" />
                        <nz-icon nzType="delete" nzTheme="outline" />
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

      nz-icon {
        font-size: 16px;
      }
    }
    `,
  ]
})

export class PasswordCardComponent {
  card = input.required<BaseCardModel>();
}