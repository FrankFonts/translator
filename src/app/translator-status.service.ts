import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TranslatorStatus, User } from './interfaces';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class TranslatorStatusService {
  translatorStatus: TranslatorStatus = {
    numberOfTranslations: 0,
    registeredUser: null,
  };

  $translatorStatus = new BehaviorSubject<TranslatorStatus>(
    this.translatorStatus
  );

  $mayTranslate = new BehaviorSubject<boolean>(true);

  constructor() {
    let localStorageContent = this.getLocalStrorageData(
      environment.localStorageKey
    );

    if (null === localStorageContent) {
      this.setLocasStorageData(this.translatorStatus);

      this.updateTranslationStatus();
    } else {
      this.translatorStatus = JSON.parse(localStorageContent);

      this.updateTranslationStatus();
    }
  }

  getLocalStrorageData(key: string): string | null {
    return localStorage.getItem(key);
  }

  setLocasStorageData(translatorStatus: TranslatorStatus) {
    localStorage.setItem(
      environment.localStorageKey,
      JSON.stringify(translatorStatus)
    );
  }

  decideIfUserMayTranslate() {
    return this.translatorStatus.numberOfTranslations < 3 ||
      this.translatorStatus.registeredUser
      ? true
      : false;
  }

  registerTranslation() {
    this.translatorStatus.numberOfTranslations += 1;
    this.updateTranslationStatus();
  }

  registerUser(user: User) {
    this.translatorStatus.registeredUser = user;
    this.updateTranslationStatus();
  }

  updateTranslationStatus() {
    this.setLocasStorageData(this.translatorStatus);
    this.$translatorStatus.next(this.translatorStatus);
    this.$mayTranslate.next(this.decideIfUserMayTranslate());
  }
}
