import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TranslatorStatus } from './interfaces';
import { TranslatorStatusService } from './translator-status.service';

@Injectable({
  providedIn: 'root',
})
export class TranslationGuard implements CanActivate {
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
      return true;
    } else {
      this.router.navigateByUrl('/registration');
      return true;
    }
  }
}
