import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TranslatorStatus } from './interfaces';
import { TranslatorStatusService } from './translator-status.service';

@Injectable({
  providedIn: 'root',
})
export class TranslationGuard implements CanActivate {
  translatorStatus: TranslatorStatus = {
    numberOfTranslations: 0,
    registeredUser: null,
    mayTranslate: false,
  };

  constructor(
    private router: Router,
    private translatorStatusService: TranslatorStatusService
  ) {
    this.translatorStatusService.$translatorStatus.subscribe((status) => {
      this.translatorStatus = status;
    });
  }

  canActivate(): boolean {
    if (this.translatorStatus.mayTranslate) {
      return true;
    } else {
      this.router.navigateByUrl('/registration');
      return true;
    }
  }
}
