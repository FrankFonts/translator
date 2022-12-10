import { Injectable } from '@angular/core';
import { TranslatorStatusService } from '../translator-status.service';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  constructor(private translatorStatus: TranslatorStatusService) {}

  registrerTranslation() {
    this.translatorStatus.registerTranslation();
  }
}
