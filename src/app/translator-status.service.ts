import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TranslatorStatus } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class TranslatorStatusService {
  private _localStorageKey: string = 'translatorStatus';

  translatorStatus: TranslatorStatus = {
    numberOfTranslations: 0,
    registeredUser: null,
    mayTranslate: true,
  };
  $translatorStatus = new BehaviorSubject<TranslatorStatus>(
    this.translatorStatus
  );

  constructor() {
    let localStorageContent = this.getLocalStrorageData(this._localStorageKey);

    if (null === localStorageContent) {
      this.setLocasStorageData(this.translatorStatus);
    } else {
      this.translatorStatus = JSON.parse(localStorageContent);
      this.$translatorStatus.next(this.translatorStatus);
    }
  }

  decideIfUserMayTranslate(translatorStatus: TranslatorStatus) {
    return this.translatorStatus.numberOfTranslations <= 3 ||
      translatorStatus.registeredUser
      ? true
      : false;
  }

  registerTranslation() {
    this.translatorStatus.numberOfTranslations =
      this.translatorStatus.numberOfTranslations + 1;

    this.translatorStatus.mayTranslate = this.decideIfUserMayTranslate(
      this.translatorStatus
    );

    this.setLocasStorageData(this.translatorStatus);
    this.$translatorStatus.next(this.translatorStatus);
  }

  getLocalStrorageData(key: string): string | null {
    return localStorage.getItem(key);
  }

  setLocasStorageData(translatorStatus: TranslatorStatus) {
    localStorage.setItem(
      this._localStorageKey,
      JSON.stringify(translatorStatus)
    );
  }
}
