import { Injectable } from '@angular/core';
import { User } from '../interfaces';
import { TranslatorStatusService } from '../translator-status.service';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  constructor(private translatorStatusService: TranslatorStatusService) {}

  registerUser(user: User) {
    this.translatorStatusService.registerUser(user);
  }
}
