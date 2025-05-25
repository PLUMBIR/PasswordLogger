import { Routes } from '@angular/router';
import { WelcomePageContentComponent } from './welcome-page-content/welcome-page-content.component';
import { MainPageContentComponent } from './main-page-content/main-page-content.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { 
        path: '',
        pathMatch: 'full',
        component: WelcomePageContentComponent
    },
    { 
        path: 'profile',
        pathMatch: 'full',
        component: MainPageContentComponent,
        canActivate: [ authGuard() ]
    }
];
