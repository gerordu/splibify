import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { SpotifyActionsService } from '../../services/spotify-actions.service';
import { SettingsComponent } from './settings/settings.component';

// Material
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';

const PanelRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'dashboard' }
]

@NgModule({
  declarations: [DashboardComponent, SettingsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(PanelRoutes),
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule
  ],
  providers: [
    SpotifyActionsService
  ]
})
export class PanelModule { }
