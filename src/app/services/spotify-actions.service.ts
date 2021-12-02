import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable()
export class SpotifyActionsService {

  constructor(
    private http: HttpClient,
    private _auths: AuthService
  ) { }

  getPlaylists() {
    return this.http.get('https://api.spotify.com/v1/me/playlists', {headers: {Authorization: 'Bearer ' + this._auths.getAccessToken }})
      .pipe(
        map((data: any) => data.items)
      );
  }
}
