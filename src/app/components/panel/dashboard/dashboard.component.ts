import { Component, OnInit, ViewChild } from '@angular/core';
import { SpotifyActionsService } from '../../../services/spotify-actions.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  data = [];
  displayedColumns: string[] = ['result_number', 'name', 'visibility', 'contains', 'actions'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private _spotas: SpotifyActionsService
  ) { }

  ngOnInit(): void {
    this._spotas.getPlaylists().subscribe(data => {
      this.data = data;
      console.log(data);
    });
  }

}
