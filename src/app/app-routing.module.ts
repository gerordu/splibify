import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CallbackComponent } from './components/callback/callback.component';
import { AuthGuard } from './guards/auth.guard';

export const ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'signin-callback', component: CallbackComponent },
    { path: 'panel', loadChildren: () => import('./components/panel/panel.module').then(mod => mod.PanelModule), canActivate: [AuthGuard] },
    { path: '**', pathMatch: 'full', redirectTo: 'home' }
];
