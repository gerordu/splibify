import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';

interface MatSnackBarConfiguration {
    type?: string;
    duration?: number;
    closeButton?: string;
}

@Injectable()
export class NotificationService {
    constructor(
        private readonly snackBar: MatSnackBar,
        private readonly zone: NgZone
    ) {}

    show(message: string, config?: MatSnackBarConfiguration): MatSnackBarRef<SimpleSnackBar> {
        return this.zone.run(() => this.snackBar.open(message, config.closeButton !== null ? config.closeButton : null, {
            horizontalPosition: 'left',
            verticalPosition: 'bottom',
            duration: config.duration ?? 6000,
            panelClass: config.type ? config.type +'-notification' : 'default-notification'
        }));
    }
}