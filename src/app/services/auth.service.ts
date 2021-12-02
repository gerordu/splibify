import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { UserData } from '../models/user.model';
import { Router } from '@angular/router';


@Injectable()
export class AuthService {

  public SpotifyAuthData: SpotifyAuthResponse = null;
  private currentUserSubject: BehaviorSubject<UserData>;
  public currentUser: Observable<UserData>;
  
  constructor(
    private http: HttpClient,
    private router: Router
  ) {
      this.currentUserSubject = new BehaviorSubject<UserData>(JSON.parse(localStorage.getItem('userData')));
      this.currentUser = this.currentUserSubject.asObservable();
  }

  public get activeUser(): UserData | null {
    return this.currentUserSubject.value;
  }

  public get getAccessToken(): string {
    return localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData'))['access_token'] : 'notoken';
  }

  setCurrentUserSubject(next): void {
    this.currentUserSubject.next(next);
  }

  urlEncodeSet(set: any): string {
    const comps = [];
    for (const i in set) {
        if (set.hasOwnProperty(i)) {
            comps.push(encodeURIComponent(i) + '=' + encodeURIComponent(set[i]));
        }
    }
    return comps.join('&');
  }

  getTokens(): Observable<boolean> {
    return this.http.post('https://accounts.spotify.com/api/token', this.urlEncodeSet({
      grant_type   : 'authorization_code',
      code         : localStorage.getItem('accessCode'),
      redirect_uri : 'http://localhost:4200/signin-callback',
      client_id    : '1d30fc67bb3e49a8a91cbe45f497dab1',
      client_secret: '588f3c742ecf4f16bb6f26765e881104'
    }), {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).pipe(
      map<SpotifyAuthResponse, boolean>(data => {
        this.SpotifyAuthData = data;
        return 'access_token' in data;
      })
    );
  }

  getUserData(): Observable<UserData> {
    return this.http.get<UserData>('https://api.spotify.com/v1/me', {headers: {Authorization: 'Bearer ' + this.SpotifyAuthData.access_token }})
      .pipe(
        tap(data => {
          data.access_token = this.SpotifyAuthData.access_token;
          localStorage.setItem('userData', JSON.stringify(data));
          this.currentUserSubject.next(data);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('userData');
    this.currentUserSubject.next(null);
    this.router.navigateByUrl('/home');
  }
}

interface SpotifyAuthResponse {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
}
