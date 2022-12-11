import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TranslatorStatusService } from './translator-status.service';

@Injectable({
  providedIn: 'root',
})
export class RegistrationGuard implements CanActivate {
  mayTranslate: boolean = true;

  constructor(
    private router: Router,
    private translatorStatusService: TranslatorStatusService
  ) {
    this.translatorStatusService.$mayTranslate.subscribe((status) => {
      this.mayTranslate = status;
    });
  }

  canActivate(): boolean {
    if (this.mayTranslate) {
      this.router.navigateByUrl('/translator');
      return false;
    } else {
      return true;
    }
  }
}
