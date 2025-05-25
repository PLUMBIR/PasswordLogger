import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-welcome-page-content',
  imports: [
    NzLayoutModule,
    FormsModule,
    NzRateModule,
    NzIconModule,
    NzDividerModule,
    HeaderComponent,
    FooterComponent
],
  templateUrl: './welcome-page-content.component.html',
  styleUrl: './welcome-page-content.component.scss'
})
export class WelcomePageContentComponent {

}
