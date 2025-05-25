import { Component, OnInit } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { WelcomePageContentComponent } from "./welcome-page-content/welcome-page-content.component";
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { authGuard } from './guards/auth.guard';

@Component({
  selector: 'app-root',
  imports: [
    NzLayoutModule,
    RouterOutlet
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  constructor(private router: Router) {}

  ngOnInit() {
    if (authGuard()) {
      this.router.navigate(['/profile']);
    } else {
      this.router.navigate(['']);
    }
  }
}
