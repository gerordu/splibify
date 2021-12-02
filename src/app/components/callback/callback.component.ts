import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private notify: NotificationService
  ) { }

  ngOnInit(): void {
    const target = window.self === window.top ? window.opener : window.parent;

    if (this.route.snapshot.queryParamMap.has('code')) {
      localStorage.setItem('accessCode', this.route.snapshot.queryParamMap.get('code'));
    } else {
      this.notify.show('Ocurrió un error al tratar de obtener los permisos necesarios, intentalo de nuevo',{type: 'info'});
    }
    target.postMessage('callback-finished', 'http://localhost:4200');
  }

}
