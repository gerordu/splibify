import { Directive, EventEmitter, ElementRef, HostListener, Input, Output } from '@angular/core';
import { fromEvent } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[appSpotilogin]'
})
export class SpotiloginDirective {

  private authWindow: Window = null;

  constructor(
    private _auths: AuthService
  ) {
    fromEvent<MessageEvent>(window, 'message').subscribe(event => {
      if (event.origin === 'http://localhost:4200' && event.data === 'callback-finished') {
        this.authWindow.close();
        this._auths.getTokens().subscribe(resp => {
          if (resp === true) {
            this._auths.getUserData().subscribe(anotherrsp => console.log(anotherrsp));
          }
        });
      }
    });
  }

  @HostListener('click', ['$event'])
  public login(event: MouseEvent): void {
    const left = (screen.width / 2) - (480 / 2);
    const top = (screen.height / 2) - (640 / 2);
    const config = {
          client_id: '1d30fc67bb3e49a8a91cbe45f497dab1',
          redirect_uri: 'http://localhost:4200/signin-callback',
          scope: 'playlist-read playlist-read-private playlist-modify-public playlist-modify-private user-library-read user-library-modify',
          response_type: 'code',
          show_dialog: true,
          state: '1wX456'
        };

    this.authWindow = window.open(
      'https://accounts.spotify.com/authorize?'+ this._auths.urlEncodeSet(config),
      'Spotify',
      `menubar=no,location=no,resizable=no,scrollbars=no,status=no,width=480,height=640,top=${ top },left=${ left }`
    );
  }

  

}
